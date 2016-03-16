/**
 * Controller for the signup state
 */
class SignupController {
  /**
   * @param $log
   * @param $auth
   * @param $state
   * @param afSignupForm
   * @ngInject
   */
  constructor($log, $auth, $state, afSignupForm) {
    this.$log = $log
    this.$auth = $auth
    this.$state = $state
    this.signupForm = afSignupForm.fields
  }

  /**
   * create a new user
   * @param user
   */
  signup(user) {
    this.$auth
      .signup(user)
      .then(response => {
        this.$auth.me = response.user
        this.$state.go('home')
      })
      .catch(err => {
        this.$log.debug('error : ', err)
      })
  }
}

export {
  SignupController,
}
