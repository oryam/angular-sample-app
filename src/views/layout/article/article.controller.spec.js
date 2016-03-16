import angular from 'angular'
import module from './index'

const mockArticle = {
  id: 2,
  title: 'fofoufou',
}

/**
 * @test {ArticleController}
 * */
describe('ArticleController', () => {
  let controller
  beforeEach(angular.mock.module(module))
  beforeEach(angular.mock.inject(($controller, afPost) => {
    afPost.inject(mockArticle)
    controller = $controller('ArticleController', {
      $stateParams: {
        id: mockArticle.id,
      },
    })
  }))
  it('should have a property $log defined', () => {
    expect(controller.$log).toBeDefined()
  })
  it('should have a property post filled with the correct post', () => {
    expect(controller.post.title).toBe(mockArticle.title)
  })
})
