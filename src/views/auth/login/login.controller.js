/**
 * Controller for the login state
 */
class LoginController {
  /**
   * @param $log
   * @param $auth
   * @param $mdToast
   * @param $filter
   * @param $state
   * @param afLoginForm
   * @ngInject
   */
  constructor($log, $auth, $mdToast, $filter, $state, afLoginForm) {
    this.$log = $log
    this.$auth = $auth
    this.$mdToast = $mdToast
    this.$filter = $filter
    this.$state = $state
    this.loginForm = afLoginForm.fields
  }

  /**
   * authenticate with email password
   * @param user
   */
  login(user) {
    this.$auth
      .login(user)
      .then(response => {
        this.$auth.me = response.user
        this.$state.go('home')
      })
      .catch(err => {
        this.$log.debug(err)
        this.$mdToast.show(
          this.$mdToast.simple()
            .content(this.$filter('translate')('LOGIN.ERROR'))
            .position('bottom right')
            .hideDelay(500)
        )
      })
  }

  /**
   * authenticate via oAuth2 provider (ex github, google, or yours if configured)
   * @param provider
   */
  authenticate(provider) {
    this.$auth
      .authenticate(provider)
      .then(response => {
        this.$log.debug(response)
        this.$state.go('home')
      })
      .catch(err => {
        this.$log.debug(err)
      })
  }
}

export {
  LoginController,
}
