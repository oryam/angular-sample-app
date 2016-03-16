import angular from 'angular'
import module from './index'

const postResponse = {
  title: 'titi',
}

/**
 * @test {RedactionController}
 * */
describe('RedactionController', () => {
  let controller
  let $httpBackend
  let afMenu
  beforeEach(angular.mock.module(module))
  beforeEach(angular.mock.inject(($controller, _$httpBackend_) => {
    afMenu = {
      items: [{
        name: 'Articles',
        children: [],
      }],
    }
    $httpBackend = _$httpBackend_
    $httpBackend.whenPOST('post').respond({
      id: 454,
      titls: 'imatitle',
    })
    controller = $controller('RedactionController', {
      afMenu,
    })
  }))
  it('should have a property $log defined', () => {
    expect(controller.$log).toBeDefined()
  })

  it('should make a Post call and return the correct data', () => {
    controller.submit(postResponse)
    $httpBackend.expectPOST('post')
    $httpBackend.flush()
  })

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()
  })
})

