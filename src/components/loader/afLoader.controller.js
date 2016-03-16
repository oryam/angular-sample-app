/**
 * Controller for afLoader component
 */
class AfLoaderController {
  /**
   * @param $log
   * @param $rootScope
   * @param $scope
   * @ngInject
   */
  constructor($log, $rootScope, $scope) {
    this.$log = $log
    this.status = {
      active: true,
    }
    var loadingListener = $rootScope.$on('$stateChangeStart', () => {
      this.$log.debug('start')
      this.setLoaderActive(true)
    })

    var loadedListener = $rootScope.$on('$viewContentLoaded', () => {
      this.setLoaderActive(false)
    })

    $scope.$on('$destroy', () => {
      loadingListener()
      loadedListener()
    })
  }

  /**
   * display the loader
   * @param isActive
   */
  setLoaderActive(isActive) {
    this.status.active = isActive
  }
}

export {
  AfLoaderController,
}
