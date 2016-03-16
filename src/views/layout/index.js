import './layout.scss'
import angular from 'angular'
import template from './layout.html'
import { LayoutController } from './layout.controller'

/**
 * Angular module for layout
 * @type {Object}
 */
const module = angular.module('af.layout', [
  require('angular-material'),
  require('angular-ui-router'),
  require('af.menu').default,
  require('af.toolbar').default,
  require('af.loader').default,

])
  .controller('LayoutController', LayoutController)
  .config(layoutConfig)

/**
 * configuration function for angular module af.layout abstract ui.router state layout
 * @param $stateProvider
 * @ngInject
 */
function layoutConfig($stateProvider) {
  $stateProvider
    .state('layout', {
      abstract: true,
      url: '',
      controller: 'LayoutController as vm',
      template,
      resolve: {
        restricted,
        getPosts,
      },
    })
}

/**
 * get all the posts and add to the menu
 * @param afPost
 * @param afMenu
 * @return {Promise}
 * @ngInject
 */
function getPosts(afPost, afMenu) {
  return afPost
    .findAll()
    .then(posts => {
      const menuItem = {
        name: 'Articles',
        icon: 'zmdi zmdi-collection-text',
        type: 'dropdown',
        children: [],
      }
      posts.forEach((post) => {
        menuItem.children.push({
          name: post.title,
          state: 'article',
          icon: 'zmdi zmdi-quote',
          params: {
            id: post.id,
          },
          type: 'link',
        })
      })
      afMenu.items.push(menuItem)
    })
}

/**
 * check token
 * @param afMenu
 * @param $http
 * @param config
 * @param $auth
 * @param $location
 * @param $log
 * @return {Promise}
 * @ngInject
 */
function restricted(afMenu, $http, config, $auth, $location, $log) {
  if ($auth.isAuthenticated()) {
    return $http.get(`${config.api.basePath}/auth/me`)
      .then(response => {
        $auth.me = response.data
        afMenu.items.find(item => {
          return item.name === 'ADMIN.MENU'
        }).restricted = !$auth.me.isAdmin
        return response
      })
      .catch(err => {
        $log.debug(err)
        $auth.logout()
        $location.path('/login')
        return err
      })
  }else {
    $location.path('/login')
  }
}

export default module.name
