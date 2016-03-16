import './signup.scss'
import template from './signup.html'
import angular from 'angular'
import {SignupController} from './signup.controller'
import {SignupFormService} from './signupForm.service'

/*eslint angular/no-service-method:0*/
const module = angular.module('af.auth.signup', [
  require('angular-ui-router'),
  require('angular-material'),
  require('angular-translate'),
  require('satellizer'),
  require('angular-formly'),
  require('angular-formly-material').default,
  require('af.config').default,
])
  .service('afSignupForm', SignupFormService)
  .controller('SignupController', SignupController)
  .config(signupConfig)

/**
 * configuration function for angular module af.signup ui.router state signup
 * @param $stateProvider
 * @ngInject
 */
function signupConfig($stateProvider) {
  $stateProvider
    .state('signup', {
      parent: 'auth',
      url: '/signup',
      template,
      controller: 'SignupController as vm',
    })
}

export default module.name
