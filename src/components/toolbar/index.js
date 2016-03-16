import './toolbar.scss'
import angular from 'angular'
import template from './toolbar.html'
import { ToolbarController } from './toolbar.controller'

/**
 * Angular module for toolbar component
 * @type {Object}
 */
const module = angular.module('af.toolbar', [
  require('angular-translate'),
  require('angular-material'),
  require('angular-ui-router'),
  require('satellizer'),
  require('af.config').default,
])
  .config(toolbarConfig)
  .controller('ToolbarController', ToolbarController)
  .component('afToolbar', {
    template,
    controller: 'ToolbarController as vm',
  })

/**
 * configuration for the toolbar component
 * @param $translateProvider
 * @ngInject
 */
function toolbarConfig($translateProvider) {
  $translateProvider.translations('en', require('./i18n/en_EN.json'))
  $translateProvider.translations('fr', require('./i18n/fr_FR.json'))
}

export default module.name
