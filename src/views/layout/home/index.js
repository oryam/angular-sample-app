import './home.scss'
import angular from 'angular'
import {HomeController} from './home.controller'
import template from './home.html'

const module = angular.module('af.home', [
  require('angular-material'),
  require('angular-ui-router'),
  require('angular-translate'),
  require('af.menu').default,
  require('af.model').default,
])
  .controller('HomeController', HomeController)
  .config(homeConfig)

/**
 * config function for module af.home
 * @param $stateProvider
 * @param $translateProvider
 * @param afMenuProvider
 * @ngInject
 */
function homeConfig($stateProvider, $translateProvider, afMenuProvider) {
  $translateProvider.translations('en', require('./i18n/en_EN.json'))
  $translateProvider.translations('fr', require('./i18n/fr_FR.json'))
  $stateProvider
    .state('home', {
      parent: 'layout',
      url: '/home',
      views: {
        content: {
          template,
          controller: 'HomeController as vm',
        },
      },
      resolve: {
        myPostsComments,
      },
    })
  afMenuProvider
    .addMenu({
      name: 'HOME.MENU',
      icon: 'zmdi zmdi-home',
      state: 'home',
      type: 'link',
    })
}

/**
 * get all comments related to user's post
 * @param afPost
 * @param $auth
 * @param $rootScope
 * @param $q
 * @return
 * @ngInject
 */
function myPostsComments(afPost, $auth, $rootScope, $q) {
  return $q((resolve, reject) => {
    const unwatch = $rootScope.$watch(() => {
      return $auth.me
    }, () => {
      if ($auth.me) {
        unwatch()
        afPost
          .findAll({
            userId: $auth.me.id,
          })
          .then(posts => {
            return $q.all(posts.map(post => {
              return afPost.loadRelations(post, ['comment'])
            }))
          })
          .then(posts => {
            if (posts.length > 0) {
              resolve(posts.map(post => {
                return post.comments
              }).reduce((flat, toFlatten) => {
                return flat.concat(toFlatten)
              }))
            } else {
              resolve()
            }
          })
          .catch(err => {
            reject(err)
          })
      }
    }, true)
  })
}

export default module.name
