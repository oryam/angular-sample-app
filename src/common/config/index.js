/*eslint no-undef: 0*/
import angular from 'angular'

/**
 * Angular module for configuration
 * @type {Object}
 */
const module = angular.module('af.config', [])
  .constant('config', angular.merge(require('./env/all.json'), require(`./env/${NODE_ENV}.json`)))

export default module.name
