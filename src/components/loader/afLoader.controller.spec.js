import angular from 'angular'
import module from './index'

/**
 * @test {AfLoaderController}
 * */
describe('afLoaderController', () => {
  let controller
  let $scope
  beforeEach(angular.mock.module(module))
  beforeEach(angular.mock.inject(($componentController, $rootScope) => {
    $scope = $rootScope.$new()
    controller = $componentController('afLoader', {
      $scope,
    })
  }))
  it('should have a property $log defined', () => {
    expect(controller.$log).toBeDefined()
  })
})
