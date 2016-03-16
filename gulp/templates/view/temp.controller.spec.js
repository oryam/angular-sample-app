import angular from 'angular'
import module from './index'

/**
 * @test {<%= upCaseName %>Controller}
 * */
describe('<%= upCaseName %>Controller', () => {
  let controller
  beforeEach(angular.mock.module(module))
  beforeEach(angular.mock.inject($controller => {
    controller = $controller('<%= upCaseName %>Controller')
  }))
  it('should have a property $log defined', () => {
    expect(controller.$log).toBeDefined()
  })
})
