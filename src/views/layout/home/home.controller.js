/**
 * Controller for the home state
 */
class HomeController {
  /**
   * @param $log
   * @param myPostsComments
   * @ngInject
   */
  constructor($log, myPostsComments) {
    this.$log = $log
    this.comments = myPostsComments
  }
}

export {
  HomeController,
}
