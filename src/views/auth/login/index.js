import './login.scss'
import template from './login.html'
import angular from 'angular'
import {LoginController} from './login.controller'
import {LoginFormService} from './loginForm.service'

/*eslint angular/no-service-method:0*/
const module = angular.module('af.auth.login', [
  require('angular-ui-router'),
  require('angular-translate'),
  require('angular-material'),
  require('satellizer'),
  require('angular-messages'),
])
  .service('afLoginForm', LoginFormService)
  .controller('LoginController', LoginController)
  .config(loginConfig)

/**
 * configuration function for angular module af.login ui.router state login
 * @param $stateProvider
 * @ngInject
 */
function loginConfig($stateProvider) {
  $stateProvider
    .state('login', {
      parent: 'auth',
      url: '/login',
      template,
      controller: 'LoginController as vm',
    })

}

export default module.name
