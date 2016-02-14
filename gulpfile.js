var gulp = require('gulp');
var config = require('./gulp.config')();
var args = require('yargs').argv;
var del = require('del');
var $$ = require('gulp-load-plugins')({lazy: true});
var serve = require('gulp-serve');

gulp.task('autotest', ['vet', 'templatecache'], function(done){
    startTests(false, done);
});

gulp.task('build', ['optimize', 'images', 'fonts'], function(){
    log ('Building everything');
});

gulp.task('bump', function(){
    var msg = 'Bumping versions ';
    var type = args.type;
    var version = args.version;
    var options = {};

    if (version){
        options.version = version;
        msg += 'to version ' + version;
    } else {
        options.type = type;
        msg += 'for a ' + type;
    }
    log(msg);

    return gulp
        .src(config.packages)
        .pipe ($$.bump(options))
        .pipe (gulp.dest(config.root));

});

gulp.task('clean', function(done){
    log('Cleaning all temporary and build folders');
    var delConfig = [].concat(config.temp, config.build);
    del(delConfig, done);
});

gulp.task('default', ['help']);

gulp.task('fonts', ['clean-fonts'], function(){
    log('Getting fonts');
    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('help', $$.taskListing);

gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function(){
    var templatecache = config.temp + config.templateCache.file;

    return gulp
        .src(config.index)
        .pipe($$.inject(gulp.src(config.css)))
        .pipe($$.inject(gulp.src(templatecache, {read:false}), {
            starttag:'<!-- inject:templates.js -->'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('images', ['clean-images'], function(){
    log('Getting and compressing images');
    return gulp
        .src(config.images)
        .pipe($$.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'assets/img'));
});

gulp.task('optimize', ['inject', 'test'], function(){
    log('Optimizing the javascript, css, html');
    var templatecache = config.temp + config.templateCache.file;
    var assets = $$.useref.assets({searchPath: './'});
    var cssFilter = $$.filter('**/*.css');
    var jsLibFilter = $$.filter('**/' + config.optimized.lib);
    var jsAppFilter = $$.filter('**/' + config.optimized.app);

    return gulp
        .src(config.index)
        .pipe($$.plumber())
        .pipe($$.inject(gulp.src(templatecache, {read:false}), {
            starttag:'<!-- inject:templates.js -->'
        }))
        .pipe(assets)
        .pipe(cssFilter)
        .pipe($$.csso())
        .pipe(cssFilter.restore())
        .pipe(jsLibFilter)
        .pipe($$.uglify())
        .pipe(jsLibFilter.restore())
        .pipe(jsAppFilter)
        .pipe($$.ngAnnotate())
        .pipe($$.uglify())
        .pipe(jsAppFilter.restore())
        .pipe($$.rev())
        .pipe(assets.restore())
        .pipe($$.useref())
        .pipe($$.revReplace())
        .pipe(gulp.dest(config.build))
        .pipe($$.rev.manifest())
        .pipe(gulp.dest(config.build));
});

gulp.task('serve', serve({
    root: ['./'],
    port: 3000,
}));

gulp.task('styles', ['clean-styles'], function(){
    log('Compiling less to CSS');

    return gulp
        .src(config.less)
        .pipe($$.plumber())
        .pipe($$.less())
        .pipe($$.autoprefixer({browsers:['last 2 versions', '> 5%']}))
        .pipe(gulp.dest(config.temp));
});

gulp.task('templatecache', ['clean-code'], function(){
    log('Creating angular $templateCache');

    return gulp
        .src(config.htmltemplates)
        .pipe($$.minifyHtml({empty:true}))
        .pipe($$.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
            ))
        .pipe(gulp.dest(config.temp));
});

gulp.task('test', ['vet'], function(done){
    startTests(true, done);
});

gulp.task('vet', function(){
    log('Analyzing code with jshint and jscs');
    return gulp
        .src(config.alljs)
        .pipe($$.plumber())
        .pipe($$.if(args.verbose, $$.print()))
        .pipe($$.jscs())
        .pipe($$.jshint())
        .pipe($$.jshint.reporter('jshint-stylish', {verbose:false}))
        .pipe($$.jshint.reporter('fail'));
});

gulp.task('watch', ['inject'], function(){
    gulp.watch('./app/**/*.js', ['test']);
    gulp.watch('./app/**/*.less', ['styles']);
    gulp.watch('./app/**/*.html', ['templatecache']);
});

gulp.task('wiredep', function(){
    log('Wiring up bower js and css, as well as app js');
    var options = config.getWiredepDefaultOptions();

    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($$.inject(gulp.src(config.js)))
        .pipe(gulp.dest('.'));
});

///////////////////
gulp.task('clean-code', function(done){
    log('Cleaning code from temp and build folders');
    var files = [].concat(config.temp + '**/*.html',
        config.build + '**/*.html',
        config.build + 'js/**/*.js');
    clean(files, done);
});

gulp.task('clean-fonts', function(done){
    log('Cleaning fonts');
    clean(config.build + 'fonts/', done);
});

gulp.task('clean-images', function(done){
    log('Cleaning images');
    clean(config.build + 'assets/img/**/*.*', done);
});

gulp.task('clean-styles', function(done){
    clean(config.appFolder + '**/*.css', done);
});

gulp.task('less-watcher', function(){
    gulp.watch([config.less], ['styles']);
});

///////////////////

function clean(path, done){
    log('Cleaning: ' + $$.util.colors.magenta(path));
    del(path, done);
}

function log(msg){
    $$.util.log($$.util.colors.blue(msg));
}

function startTests(singleRun, done){
    var karma = require('karma').server;
    var excludeFiles = [];

    karma.start({
        configFile: __dirname + '/karma.config.js',
        excluse: excludeFiles,
        action: (!!singleRun ? 'run' : 'watch')

    }, karmaCompleted);

    function karmaCompleted(karmaResult){
        log('Karma completed');
        if (karmaResult === 1){
            done('karma: tests failed with code ' + karmaResult);
        } else {
            done();
        }
    }
}
