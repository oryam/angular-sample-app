/**
 * Controller for the article state
 */
class ArticleController {
  /**
   * @param $log
   * @param afPost
   * @param $stateParams
   * @ngInject
   */
  constructor($log, afPost, $stateParams) {
    this.$log = $log
    this.post = afPost.get($stateParams.id)
  }
}

export {
  ArticleController,
}
