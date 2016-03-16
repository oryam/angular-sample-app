import angular from 'angular'
import module from './index'

/**
 * @test {<%= upCaseName %>}
 * */
describe('<%= name %>Controller', () => {
  let controller
  let $scope
  beforeEach(angular.mock.module(module))
  beforeEach(angular.mock.inject(($componentController, $rootScope) => {
    $scope = $rootScope.$new()
    controller = $componentController('<%= name %>')
  }))
  it('should have a property $log defined', () => {
    expect(controller.$log).toBeDefined()
  })
})
