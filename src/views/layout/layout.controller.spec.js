import angular from 'angular'
import module from './index'

/**
 * @test {AngularFormationController}
 * */
describe('angularFormationController', () => {
  let controller
  beforeEach(angular.mock.module(module))
  beforeEach(angular.mock.inject($controller => {
    controller = $controller('LayoutController')
  }))
  it('should have a property $log defined', () => {
    expect(controller.$log).toBeDefined()
  })
  it('should have a property isHovered with false value', () => {
    expect(controller.isHovered).toBeFalsy()
  })
  it('should assign isHovered value to true when enterLeftAside is called', () => {
    controller.enterLeftAside()
    expect(controller.isHovered).toBeTruthy()
  })
  it('should assign isHovered value to false when leaveLeftAside is called', () => {
    controller.enterLeftAside()
    controller.leaveLeftAside()
    expect(controller.isHovered).toBeFalsy()
  })
})
