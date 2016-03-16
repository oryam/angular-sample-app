import './afLoader.scss'
import angular from 'angular'
import template from './afLoader.html'
import { AfLoaderController } from './afLoader.controller'

/**
 * Angular module for afLoader component
 * @type {Object}
 */
const module = angular.module('af.afLoader', [
  require('angular-material'),
  require('angular-ui-router'),
])
  .controller('AfLoaderController', AfLoaderController)
  .component('afLoader', {
    template,
    controller: 'AfLoaderController as vm',
  })

export default module.name
