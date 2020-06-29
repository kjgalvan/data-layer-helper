const BROWSERS_TO_TEST = ['Chrome']

module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      // closure library
      {pattern: 'node_modules/google-closure-library/closure/goog/base.js'},
      // source files
      {pattern: 'src/**/*.js', included: false},
      // tests
      {pattern: 'test/**_test.js'},
    ],
    preprocessors: {
      // tests are preprocessed for dependencies (closure) and iits
      'test/**/*_test.js': ['googmodule'],
      // source files are preprocessed for dependencies
      'src/**/*.js': ['googmodule'],
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-spec-reporter'),
      require('karma-jasmine-html-reporter'),
      require('karma-googmodule-preprocessor'),
    ],
    reporters: ['spec', 'kjhtml'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: BROWSERS_TO_TEST,
    client: {
      clearContext: false
    },
    singleRun: false,
    concurrency: Infinity,
  })
}
