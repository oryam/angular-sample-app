import './admin.scss'
import angular from 'angular'
import template from './admin.html'

const module = angular.module('af.admin', [
  require('angular-ui-router'),
  require('angular-translate'),
  require('angular-material'),
  require('satellizer'),
  require('af.menu').default,
])
  .config(adminConfig)

/**
 * configuration function for angular module af.admin ui.router state admin
 * @param $stateProvider
 * @param $translateProvider
 * @param afMenuProvider
 * @ngInject
 */
function adminConfig($stateProvider, $translateProvider, afMenuProvider) {
  $translateProvider.translations('en', require('./i18n/en_EN.json'))
  $translateProvider.translations('fr', require('./i18n/fr_FR.json'))
  $stateProvider
    .state('admin', {
      parent: 'layout',
      url: '/admin',
      views: {
        content: {
          template,
        },
      },
      resolve: {
        adminOnly,
      },
    })
  afMenuProvider
    .addMenu({
      name: 'ADMIN.MENU',
      icon: 'zmdi zmdi-settings',
      type: 'dropdown',
      children: [
        {
          name: 'REDACTION.MENU',
          state: 'redaction',
          icon: 'zmdi zmdi-edit',
          type: 'link',
        },
        {
          name: 'USERS.MENU',
          state: 'users',
          icon: 'zmdi zmdi-accounts',
          type: 'link',
        },
      ],
    })
}

/**
 * restrict the access for admin users only
 * @param $auth
 * @param $rootScope
 * @param $q
 * @return {*}
 * @ngInject
 */
function adminOnly($auth, $rootScope, $q) {
  return $q((resolve, reject) => {
    let unwatch = $rootScope.$watch(() => {
      return $auth.me
    }, () => {
      if (angular.isDefined($auth.me)) {
        unwatch()
        if ($auth.me.isAdmin) {
          resolve()
        }else {
          reject()
        }
      }
    }, true)
  })
}

export default module.name
