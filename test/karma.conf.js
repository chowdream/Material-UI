// Karma configuration
module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['browserify', 'mocha', 'chai-sinon'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/browser/**/*spec.js',
    ],
    preprocessors: {
      'test/browser/**/*spec.js': ['browserify'],
    },
    browserify: {
      debug: true,
      extensions: ['.js', '.jsx'],
      paths: ['./node_modules', './src'],
      transform: [
        ['babelify', {
          sourceMap: 'inline',
        }],
        'browserify-istanbul',
      ],
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      dir: 'test/coverage/browser',
      subdir: function(browser) {
        return browser.toLowerCase().split(/[ /-]/)[0];
      },
      reporters: [
        {type: 'lcovonly', subdir: '.', file: 'lcov.info'},
        {type: 'text', subdir: '.', file: 'text.txt'},
        {type: 'text-summary', subdir: '.'},
        {type: 'html', subdir: 'html'},
      ],
    },
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DISABLE,
    autoWatch: false,
    singleRun: false,
    browsers: ['PhantomJS'],
  });
};
