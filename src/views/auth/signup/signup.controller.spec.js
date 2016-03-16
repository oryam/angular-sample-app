import angular from 'angular'
import module from './index'
import {$authMock} from '../auth.mock'

/**
 * @test {SignupController}
 * */
describe('SignupController', () => {
  let controller
  let $auth = new $authMock()
  beforeEach(angular.mock.module(module))
  beforeEach(angular.mock.inject($controller => {
    controller = $controller('SignupController', {
      $auth,
    })
    spyOn($auth, 'signup').and.callThrough()
  }))
  it('should have a property $log defined', () => {
    expect(controller.$log).toBeDefined()
  })
  it('should call the method signup of satellizer when signup controller method is called', () => {
    controller.signup()
    expect($auth.signup).toHaveBeenCalled()
  })
})
