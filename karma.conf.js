const BROWSERS_TO_TEST = ['Chrome']

module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine', 'closure'],
    files: [
      // closure library
      {pattern: 'node_modules/google-closure-library/closure/goog/base.js'},
      {pattern: 'node_modules/google-closure-library/closure/goog/deps.js',
        included: false},
      // source files
      {pattern: 'src/**/*.js'},
      // tests
      {pattern: 'test/**_test.js'},
      // jquery
      {pattern: 'test/lib/jquery*'},
    ],
    preprocessors: {
      // tests are preprocessed for dependencies (closure) and iits
      'test/**/*_test.js': ['googmodule', 'closure', 'closure-iit'],
      // source files are preprocessed for dependencies
      'src/**/*.js': ['googmodule', 'closure'],
      'node_modules/google-closure-library/closure/goog/deps.js': ['googmodule', 'closure-deps'],
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-closure'),
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
