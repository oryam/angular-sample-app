import './redaction.scss'
import angular from 'angular'
import {RedactionController} from './redaction.controller'
import template from './redaction.html'

const module = angular.module('af.redaction', [
  require('angular-ui-router'),
  require('angular-translate'),
  require('angular-material'),
  require('angular-formly'),
  require('angular-formly-material').default,
  require('af.menu').default,
  require('af.model').default,
])
  .controller('RedactionController', RedactionController)
  .config(redactionConfig)

/**
 * configuration function for angular module af.redaction ui.router state redaction
 * @param $stateProvider
 * @param $translateProvider
 * @ngInject
 */
function redactionConfig($stateProvider, $translateProvider) {
  $translateProvider.translations('en', require('./i18n/en_EN.json'))
  $translateProvider.translations('fr', require('./i18n/fr_FR.json'))
  $stateProvider
    .state('redaction', {
      parent: 'admin',
      url: '/redaction',
      template,
      controller: 'RedactionController as vm',
    })
}

export default module.name
