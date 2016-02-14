module.exports = function(){
    var appFolder = './app/';
    var temp = './.tmp/';

    var config = {
        appFolder: appFolder,

        /**
         * File paths
         */
        alljs: [
            appFolder + '**/*.js',
            './*.js'
        ],
        build: './build/',
        css:[
            'assets/libs/bootstrap/dist/css/bootstrap.min.css',
            'assets/css/*.css',
            temp + '**/*.css',
        ],
        fonts: './assets/libs/bootstrap/dist/fonts/*.*',
        htmltemplates: appFolder + '**/*.html',
        images: 'assets/img/**/*.*',
        index: 'index.html',
        js: [
            appFolder + '**/*.module.js',
            appFolder + '**/*.js',
            '!' + appFolder + '**/*.spec.js'
        ],
        less: ['./app/**/*.less'],
        root: './',
        temp: temp,

        /**
         * Optimized
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        /**
         * Bower and npm locations
         */
        bower: {
            json: require('./bower.json'),
            directory: 'assets/libs/',
            ignorePath: '../..'
        },
        packages : ['./package.json', './bower.json'],

        /**
         * Template cache options
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'myNovel',
                standAlone: false,
                root: 'app/'
            }
        }
    };

    config.getWiredepDefaultOptions = function(){
        var options = {
            bowerJson: config.bower.json,
            bowerDirectory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};
