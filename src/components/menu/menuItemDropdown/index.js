import angular from 'angular'
import template from './menuItemDropdown.html'
import { AfMenuItemDropdownController } from './menuItemDropdown.controller'

/**
 * Angular module for menuItemDropdown component
 * @type {Object}
 */
const module = angular.module('af.menuItemDropdown', [
  require('angular-material'),
])
  .controller('AfMenuItemDropdownController', AfMenuItemDropdownController)
  .component('afMenuItemDropdown', {
    bindings: {
      item: '=',
    },
    template,
    controller: 'AfMenuItemDropdownController as vm',
  })

export default module.name
