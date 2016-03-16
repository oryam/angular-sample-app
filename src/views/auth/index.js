import './auth.scss'
import angular from 'angular'

const module = angular.module('af.auth', [
  require('angular-ui-router'),
  require('angular-translate'),
  require('angular-material'),
  require('satellizer'),
  require('./config/auth.config').default,
  require('angular-formly'),
  require('angular-formly-material').default,
])
  .config(authConfigCb)
  .run(authRun)

/**
 * configuration function for angular module af.auth ui.router state auth
 * @param $stateProvider
 * @param $translateProvider
 * @param $authProvider
 * @param authConfig
 * @ngInject
 */
function authConfigCb($stateProvider, $translateProvider, $authProvider, authConfig) {
  $translateProvider.translations('en', require('./i18n/en_EN.json'))
  $translateProvider.translations('fr', require('./i18n/fr_FR.json'))

  angular.merge($authProvider, authConfig.config)
  $authProvider.github(authConfig.github)
  $stateProvider
    .state('auth', {
      url: '',
      template: `<main layout="column" ui-view></main>`,
      resolve: {
        skipIfToken: ($auth, $q) => {
          'ngInject'
          return $q((resolve, reject) => {
            if ($auth.isAuthenticated()) {
              reject()
            } else {
              resolve()
            }
          })
        },
      },
    })
}

/**
 * run function of af.auth module
 * @param formlyValidationMessages
 * @param $translate
 * @ngInject
 */
function authRun(formlyValidationMessages, $translate) {
  formlyValidationMessages.addStringMessage('uniqEmail', $translate.instant('AUTH.SIGNUP.VALIDATION.UNIQEMAIL.ALTERNATE'))
}

export default module.name
