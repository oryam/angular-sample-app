import angular from 'angular'
import module from './index'

const mockComments = [
  {
    title: 'foo',
  },
  {
    title: 'bar',
  },
]

/**
 * @test {HomeController}
 * */
describe('HomeController', () => {
  let controller
  beforeEach(angular.mock.module(module))
  beforeEach(angular.mock.inject($controller => {
    controller = $controller('HomeController', {
      myPostsComments: mockComments,
    })
  }))
  it('should have a property $log defined', () => {
    expect(controller.$log).toBeDefined()
  })
  it('should have a property comments', () => {
    expect(controller.comments).toBe(mockComments)
  })
})
