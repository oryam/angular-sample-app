import angular from 'angular'
import template from './menuItemLink.html'
import { AfMenuItemLinkController } from './menuItemLink.controller'

/**
 * Angular module for afMenuItemLink component
 * @type {Object}
 */
const module = angular.module('af.menuItemLink', [
  require('angular-material'),
  require('angular-ui-router'),
])
  .controller('AfMenuItemLinkController', AfMenuItemLinkController)
  .component('afMenuItemLink', {
    bindings: {
      item: '=',
    },
    template,
    controller: 'AfMenuItemLinkController as vm',
  })

export default module.name
