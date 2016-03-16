/**
 * Controller for menuItemDropdown component
 */
class AfMenuItemDropdownController {
  /**
   * @param $log
   * @param $scope
   * @ngInject
   */
  constructor($log, $scope) {
    this.$log = $log
    this.$scope = $scope
    const unwatchToggleDropdown = $scope.$on('toggleDropdownMenu', (event, item, open) => {
      if (this.item === item) {
        this.item.open = open
      } else {
        this.item.open = false
      }
    })
    const unwatchOpenParent = $scope.$on('openParents', () => {
      this.item.open = true
    })
    $scope.$on('destroy', () => {
      unwatchOpenParent()
      unwatchToggleDropdown()
    })
  }

  /**
   * toggle the dropdown, broadcast an event from the parent scope to close all the sibling dropdown item
   */
  toggleDropdownMenu() {
    this.$scope.$parent.$broadcast('toggleDropdownMenu', this.item, !this.item.open)
  }
}

export {
  AfMenuItemDropdownController,
}
