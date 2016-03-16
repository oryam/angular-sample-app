import './<%= name %>.scss'
import angular from 'angular'
import {<%= upCaseName %>Controller} from './<%= name %>.controller'
import template from './<%= name %>.html'

const module = angular.module('af.<%= parent %>.<%= name %>', [
  require('angular-ui-router'),
  require('angular-translate'),
  require('angular-material'),
  'af.menu',
])
  .controller('<%= upCaseName %>Controller', <%= upCaseName %>Controller)
  .config(<%= name %>Config)

/**
 * configuration function for angular module af.<%= name %> ui.router state <%= name %>
 * @param $stateProvider
 * @param $translateProvider
 * @param afMenuProvider
 * @ngInject
 */
function <%= name %>Config($stateProvider, $translateProvider, afMenuProvider) {
  $translateProvider.translations('en', require('./i18n/en_EN.json'))
  $translateProvider.translations('fr', require('./i18n/fr_FR.json'))
  $stateProvider
    .state('<%= name %>', {
      <% if (parent){%>parent: '<%=parent%>',<%}%>
      url: '/<%= name %>',
      template,
      controller: '<%= upCaseName %>Controller as vm',
    })
  afMenuProvider
    .addMenu({
      name: '<%= upCaseFull %>.MENU',
      icon: 'zmdi zmdi-<%= name %>',
      state: '<%= name %>',
      type: 'link',
    })
}

export default module.name
