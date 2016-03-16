import angular from 'angular'
import module from './index'

/**
 * @test {AfMenuController}
 * */
describe('menuController', () => {
  let controller
  let $scope
  let afMenu
  beforeEach(angular.mock.module(module))
  beforeEach(angular.mock.inject((_afMenu_, $rootScope, $componentController) => {
    afMenu = _afMenu_
    $scope = $rootScope.$new()
    controller = new $componentController('afMenu', {
      $scope,
    })
  }))
  it('should have a property $log defined', () => {
    expect(controller.$log).toBeDefined()
  })
  it('should have a property items filled with data in the service', () => {
    expect(controller.items).toBe(afMenu.items)
  })
})
