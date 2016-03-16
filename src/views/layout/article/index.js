import './article.scss'
import angular from 'angular'
import {ArticleController} from './article.controller'
import template from './article.html'

const module = angular.module('af.article', [
  require('angular-material'),
  require('angular-ui-router'),
  require('angular-translate'),
  require('af.menu').default,
  require('af.model').default,
])
  .controller('ArticleController', ArticleController)
  .config(articleConfig)

/**
 * configuration function for angular module af.article ui.router state article
 * @param $stateProvider
 * @param $translateProvider
 * @ngInject
 */
function articleConfig($stateProvider, $translateProvider) {
  $translateProvider.translations('en', require('./i18n/en_EN.json'))
  $translateProvider.translations('fr', require('./i18n/fr_FR.json'))
  $stateProvider
    .state('article', {
      parent: 'layout',
      url: '/article/:id',
      views: {
        content: {
          template,
          controller: 'ArticleController as vm',
        },
      },
      resolve: {
        getPost,
      },
    })
}

/**
 * get the post corresponding t the url param
 * @param afPost
 * @param $stateParams
 * @return {*}
 * @ngInject
 */
function getPost(afPost, $stateParams) {
  return afPost.find($stateParams.id)
    .then(post => {
      return afPost.loadRelations(post, ['comment'])
    })
}

export default module.name
