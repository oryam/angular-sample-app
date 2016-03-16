import angular from 'angular'

/**
 * Controller for menuItemLink component
 */
class AfMenuItemLinkController {
  /**
   * @param $log
   * @param $scope
   * @param $state
   * @ngInject
   */
  constructor($log, $scope, $state, $mdSidenav) {
    this.$log = $log
    this.$state = $state
    this.$scope = $scope
    this.$mdSidenav = $mdSidenav
    // on init check if this is current menu
    this.checkItemActive($state.current.name, $state.params)

    $scope.$on('$stateChangeSuccess', (event, toState, toParams) => {
      this.checkItemActive(toState.name, toParams)
    })
  }

  /**
   * check if current menu item is active or not
   */
  checkItemActive() {
    // first check if the state is the same
    this.item.active = this.$state.includes(this.item.state, this.item.params)
    // if we are now the active open all parent dropdown items
    if (this.item.active) {
      this.$scope.$emit('openParents')
    }
  }

  /**
   * redirect to the state of the current menu item
   */
  openLink() {
    var params = angular.isUndefined(this.item.params) ? {} : this.item.params
    this.$state.go(this.item.state, params)
    this.item.active = true
    this.$mdSidenav('left').close()
  }
}

export {
  AfMenuItemLinkController,
}
