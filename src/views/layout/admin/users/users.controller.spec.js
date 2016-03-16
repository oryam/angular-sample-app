import angular from 'angular'
import module from './index'

/**
 * @test {UsersController}
 * */
describe('UsersController', () => {
  let controller
  beforeEach(angular.mock.module(module))
  beforeEach(angular.mock.inject($controller => {
    controller = $controller('UsersController')
  }))
  it('should have a property $log defined', () => {
    expect(controller.$log).toBeDefined()
  })
})
