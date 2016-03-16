/*eslint no-undef: 0*/
import angular from 'angular'

/**
 * Angular module for configuration
 * @type {Object}
 */
const module = angular.module('af.auth.config', [])
  .constant('authConfig', require(`./env/${NODE_ENV}.json`))

export default module.name
