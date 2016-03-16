import './menu.scss'
import angular from 'angular'
import template from './menu.html'
import { AfMenuController } from './menu.controller'
import { MenuProvider } from './menu.provider'

/**
 * Angular module for menu component
 * @type {Object}
 */
const module = angular.module('af.menu', [
  require('angular-material'),
  require('./menuItemDropdown').default,
  require('./menuItemLink').default,
])
  .provider('afMenu', MenuProvider)
  .controller('AfMenuController', AfMenuController)
  .component('afMenu', {
    template,
    controller: 'AfMenuController as vm',
  })


export default module.name
