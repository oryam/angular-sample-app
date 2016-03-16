import './users.scss'
import 'ag-grid/dist/styles/ag-grid.css'
import 'ag-grid/dist/styles/theme-fresh.css'
import template from './users.html'
import angular from 'angular'
import {UsersController} from './users.controller'
import {initialiseAgGridWithAngular1} from 'ag-grid/main'

initialiseAgGridWithAngular1(angular)

const module = angular.module('af.users', [
  require('angular-ui-router'),
  require('angular-translate'),
  require('angular-material'),
  require('af.model').default,
  'agGrid',
])
  .controller('UsersController', UsersController)
  .config(usersConfig)

/**
 * configuration function for angular module af.users ui.router state users
 * @param $stateProvider
 * @param $translateProvider
 * @ngInject
 */
function usersConfig($stateProvider, $translateProvider) {
  $translateProvider.translations('en', require('./i18n/en_EN.json'))
  $translateProvider.translations('fr', require('./i18n/fr_FR.json'))
  $stateProvider
    .state('users', {
      parent: 'admin',
      url: '/users',
      template,
      controller: 'UsersController as vm',
      resolve: {
        getUsers,
      },
    })
}
/**
 * get the first ten users
 * @param afUser
 * @return {*}
 * @ngInject
 */
function getUsers(afUser) {
  return afUser.findAll({
    _start: 0,
    _limit: 10,
  })
}

export default module.name
