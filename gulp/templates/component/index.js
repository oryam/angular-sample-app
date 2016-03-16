import './<%= name %>.scss'
import angular from 'angular'
import template from './<%= name %>.html'
import { <%= upCaseName %>Controller } from './<%= name %>.controller'

/**
 * Angular module for <%= name %> component
 * @type {Object}
 */
const module = angular.module('af.<%= name %>', [])
  .controller('<%= upCaseName %>Controller', <%= upCaseName %>Controller)
  .component('<%= name %>', {
    template,
    controller: '<%= upCaseName %>Controller as vm',
  })

export default module.name
