import angular from 'angular'
import module from './index'
import {$authMock} from '../auth.mock'

/**
 * @test {LoginController}
 * */
describe('LoginController', () => {
  let controller
  let $auth = new $authMock
  beforeEach(angular.mock.module(module))
  beforeEach(angular.mock.inject($controller => {
    controller = $controller('LoginController', {
      $auth,
    })
    spyOn($auth, 'login').and.callThrough()
    spyOn($auth, 'authenticate').and.callThrough()
  }))
  it('should have a property $log defined', () => {
    expect(controller.$log).toBeDefined()
  })
  it('should call the method signup of satellizer when signup controller method is called', () => {
    controller.authenticate('foo')
    expect($auth.authenticate).toHaveBeenCalledWith('foo')
  })
  it('should call the method signup of satellizer when signup controller method is called', () => {
    controller.login()
    expect($auth.login).toHaveBeenCalled()
  })
})
