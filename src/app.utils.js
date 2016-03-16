import localforage from 'localforage'
import DSLocalForageAdapter from 'js-data-localforage'

/**
 * array of vendors dependancies
 * @type {*[]}
 */
const vendors = [
  require('angular-animate'),
  require('angular-aria'),
  require('angular-sanitize'),
  require('angular-ui-router'),
  require('angular-material'),
  require('angular-translate'),
  require('satellizer'),
  require('js-data-angular'),
  require('angular-formly'),
  require('angular-formly-material'),
]


/**
 * get every file called index (angular module) in subdirectories and return an array of their name
 * @return {Object} - an array of angular module name (the dependancies of the app)
 */
function loadModule() {
  const context = require.context('./', true, /index.js$/)
  return context.keys().map(context).map(module => {
    return module.default
  })
}

/**
 * Main run function
 * @param $rootScope
 * @param $log
 * @param DS
 * @ngInject
 */
function appRun($rootScope, $log, DS) {
  /*eslint no-unused-vars:0*/
  /*eslint angular/on-watch:0*/
  $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error) {
    $log.error(error)
  })
  $rootScope.pageTitle = 'Angular Formation'
  localforage.setDriver([
    localforage.INDEXEDDB,
    localforage.WEBSQL,
    localforage.LOCALSTORAGE,
  ])
  DS.registerAdapter('localforage', new DSLocalForageAdapter())
}

/**
 * Main config function
 * @param $logProvider
 * @param $urlRouterProvider
 * @param $translateProvider
 * @param $mdThemingProvider
 * @param config
 * @param DSHttpAdapterProvider
 * @param DSProvider
 * @ngInject
 */
function appConfig($logProvider, $urlRouterProvider, $translateProvider, $mdThemingProvider, config, DSProvider, DSHttpAdapterProvider) {
  /*eslint no-undef:0*/
  $logProvider.debugEnabled(NODE_ENV === 'development')
  $urlRouterProvider.otherwise('/home')
  let locale = config.languages.find(language => {
    return language.key === navigator.language
  })
  if (!locale) {
    locale = {
      key: 'en',
    }
  }
  $translateProvider.preferredLanguage(locale.key)
  angular.extend(DSProvider.defaults, config.api)
  angular.extend(DSHttpAdapterProvider.defaults, config.api)
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('blue-grey')
    .warnPalette('amber')
}

/**
 * Return a camelcase version of the string given in parameter
 * @param input - string you want in camelCase
 * @return {string} - the string given in param camelized
 */
function camelCase(input) {
  return input.toLowerCase().replace(/-(.)/g, (match, group1) => {
    return group1.toUpperCase()
  })
}

export {
  appConfig,
  appRun,
  loadModule,
  camelCase,
  vendors,
}
