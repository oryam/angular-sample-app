const SpecReporter = require('jasmine-spec-reporter')

exports.config = {
  baseUrl: 'http://localhost:8080',
  specs: ['test/e2e/**/*.spec.js'],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: () => {},
  },
  onPrepare: () => {
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}))
  },
}
