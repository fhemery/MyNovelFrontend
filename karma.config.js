module.exports = function(config){
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies : true}).js;

    var files = [].concat(
        bowerFiles,
        './app/**/*.module.js',
        './app/**/*.js',
        './app/**/*.spec.js'
    );

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: files,

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/components/**/!(*.spec|partials|app).js': 'coverage'
        },

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: 'Reports/coverage',
            reporters: [
                {type: 'html', subdir: '.'},
                {type: 'text-summary'}
            ]
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        junitReporter : { // name => junit
            outputFile: 'Reports/coverage/TestResultsUI.xml'
        },
        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR
        // || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
