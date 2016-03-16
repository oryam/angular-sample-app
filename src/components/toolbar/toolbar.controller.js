/**
 * Controller for toolbar component
 */
class ToolbarController {
  /**
   * @param $log
   * @param $translate
   * @param $document
   * @param $mdToast
   * @param $mdSidenav
   * @param $filter
   * @param $auth
   * @param $state
   * @param config
   * @ngInject
   */
  constructor($log, $translate, $document, $mdToast, $mdSidenav, $filter, $auth, $state, config) {
    this.$log = $log
    this.$translate = $translate
    this.$mdToast = $mdToast
    this.$mdSidenav = $mdSidenav
    this.doc = $document[0]
    this.$filter = $filter
    this.fullScreenIcon = 'zmdi zmdi-fullscreen'
    this.$auth = $auth
    this.$state = $state
    this.languages = config.languages
  }

  /**
   * logout and redirect to login page
   */
  logout() {
    this.$auth.logout()
    this.$state.go('login')
  }

  /**
   * Switch angular-translate language
   * @param key - the key representing the language ex: en
   */
  switchLanguage(key) {
    this.$translate.use(key)
      .then(() => {
        this.$mdToast.show(
          this.$mdToast.simple()
            .content(this.$filter('translate')('LANGUAGE_CHANGED'))
            .position('bottom right')
            .hideDelay(500)
        )
      })
  }

  /**
   * switch to fullScreen mode f11 to resume
   */
  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen
    this.fullScreenIcon = this.isFullScreen ? 'zmdi zmdi-fullscreen-exit' : 'zmdi zmdi-fullscreen'

    if (!this.doc.fullscreenElement && !this.doc.mozFullScreenElement && !this.doc.webkitFullscreenElement && !this.doc.msFullscreenElement) {
      if (this.doc.documentElement.requestFullscreen) {
        this.doc.documentElement.requestFullscreen()
      } else if (this.doc.documentElement.msRequestFullscreen) {
        this.doc.documentElement.msRequestFullscreen()
      } else if (this.doc.documentElement.mozRequestFullScreen) {
        this.doc.documentElement.mozRequestFullScreen()
      } else if (this.doc.documentElement.webkitRequestFullscreen) {
        this.doc.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
      }
    } else {
      if (this.doc.exitFullscreen) {
        this.doc.exitFullscreen()
      } else if (this.doc.msExitFullscreen) {
        this.doc.msExitFullscreen()
      } else if (this.doc.mozCancelFullScreen) {
        this.doc.mozCancelFullScreen()
      } else if (this.doc.webkitExitFullscreen) {
        this.doc.webkitExitFullscreen()
      }
    }
  }

  /**
   * toggle the sideNav
   * @param id - the id of the sidenav (not the classic the ngMaterial one)
   */
  openSidenav(id) {
    this.$mdSidenav(id).toggle()
  }
}

export {
  ToolbarController,
}
