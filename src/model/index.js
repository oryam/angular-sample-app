import angular from 'angular'
import {PostService} from './post.service'
import {CommentService} from './comment.service'
import {UserService} from './user.service'

/*eslint angular/no-service-method:0*/
const module = angular.module('af.model', [
  require('js-data-angular'),
  require('angular-formly'),
  require('angular-formly-material').default,
  require('angular-translate'),
])
  .run(modelRun)
  .config(modelConfig)
  .service('afPost', PostService)
  .service('afComment', CommentService)
  .service('afUser', UserService)
/**
 *
 * @param $translateProvider
 * @ngInject
 */
function modelConfig($translateProvider) {
  $translateProvider.translations('en', require('./i18n/en_EN.json'))
  $translateProvider.translations('fr', require('./i18n/fr_FR.json'))
}

/**
 * @param $translate
 * @param formlyValidationMessages
 * @ngInject
 */
function modelRun(formlyValidationMessages, $translate) {
  formlyValidationMessages.addTemplateOptionValueMessage('required', 'required', $translate.instant('FORM.VALIDATION.REQUIRED.PREFIX'), $translate.instant('FORM.VALIDATION.REQUIRED.SUFFIX'), $translate.instant('FORM.VALIDATION.REQUIRED.ALTERNATE'))
  formlyValidationMessages.addTemplateOptionValueMessage('email', 'email', $translate.instant('FORM.VALIDATION.EMAIL.PREFIX'), $translate.instant('FORM.VALIDATION.EMAIL.SUFFIX'), $translate.instant('FORM.VALIDATION.EMAIL.ALTERNATE'))

}

export default module.name
