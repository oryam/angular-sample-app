/**
 * Controller for the <%= name %> state
 */
class <%= upCaseName %>Controller {
  /**
   * @param $log
   * @ngInject
   */
  constructor($log) {
    this.$log = $log
  }

  action() {
    this.$log.debug('hello')
  }
}

export {
  <%= upCaseName %>Controller,
}
