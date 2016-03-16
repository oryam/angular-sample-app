/*eslint angular/window-service:0*/
window.angular = require('angular')
require('angular-mocks')

const testsContext = require.context('../../src', true, /.spec.js$/)
testsContext.keys().forEach(testsContext)
