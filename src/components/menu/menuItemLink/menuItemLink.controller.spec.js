import angular from 'angular'
import module from './index'

/**
 * @test {MenuItemLink}
 * */
describe('menuItemLinkController', () => {
  let controller
  let $scope
  const item = {
    label: 'Foo',
    state: 'foo',
    icon: 'bar',
  }
  beforeEach(angular.mock.module(module))
  beforeEach(angular.mock.inject(($componentController, $rootScope) => {
    $scope = $rootScope.$new()
    controller = $componentController('afMenuItemLink', {
      $scope,
    }, {
      item,
    })
  }))
  it('should have a property $log defined', () => {
    expect(controller.$log).toBeDefined()
  })

  it('should have a property item with correct value', () => {
    expect(controller.item).toBe(item)
  })
})
