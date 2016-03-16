/**
 * Controller for the redaction state
 */
class RedactionController {
  /**
   * @param $log
   * @param afPost
   * @param afMenu
   * @param $mdToast
   * @param $filter
   * @ngInject
   */
  constructor($log, afPost, afMenu, $mdToast, $filter) {
    this.$log = $log
    this.afPost = afPost
    this.afMenu = afMenu
    this.formlyConfig = afPost.fields
    this.$mdToast = $mdToast
    this.$filter = $filter
  }

  /**
   * create a new post
   * @param post
   * @return {Promise}
   */
  submit(post) {
    return this.afPost
      .create(post)
      .then(createdPost => {
        const articlesMenuItem = this.afMenu.items.find((item)=>{
          return item.name === 'Articles'
        })
        if (articlesMenuItem) {
          articlesMenuItem.children.push({
            name: createdPost.title,
            state: 'article',
            type: 'link',
            params: {
              id: createdPost.id,
            },
          })
        }

        this.$mdToast.show(
          this.$mdToast.simple()
            .content(this.$filter('translate')('REDACTION.POSTCREATION'))
            .position('bottom right')
            .hideDelay(500)
        )
      })
      .catch(() => {
        this.$mdToast.show(
          this.$mdToast.simple()
            .content(this.$filter('translate')('REDACTION.POSTERROR'))
            .position('bottom right')
            .hideDelay(500)
        )
      })
  }
}

export {
  RedactionController,
}
