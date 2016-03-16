import bgTop from './bgTop.jpg'

/**
 * Controller for the layout of the restricted part of the app
 */
class LayoutController {
  /**
   * @param $log
   * @ngInject
   */
  constructor($log) {
    this.isHovered = false
    this.$log = $log
    this.bgTop = bgTop
  }

  /**
   * callback for ng-mouseenter directive
   */
  enterLeftAside() {
    this.isHovered = true
  }

  /**
   * callback for ng-mouseleave directive
   */
  leaveLeftAside() {
    this.isHovered = false
  }
}

export {
  LayoutController,
}
