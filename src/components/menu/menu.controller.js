/**
 * Controller for menu component
 */
class AfMenuController {
  /**
   * @param $log
   * @param afMenu
   * @ngInject
   */
  constructor($log, afMenu) {
    this.$log = $log
    this.items = afMenu.items
  }
}

export {
  AfMenuController,
}
