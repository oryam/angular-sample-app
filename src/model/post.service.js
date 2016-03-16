/*eslint no-unused-vars:0*/
class PostService {
  /**
   * @param afComment
   * @param $log
   * @param $translate
   * @param DS
   * @ngInject
   */
  constructor(DS, afComment, $log, $translate) {
    const Post = DS.defineResource({
      name: 'post',
      endpoint: 'post',
      idAttribute: 'id',
      relations: {
        hasMany: {
          comment: {
            localField: 'comments',
            foreignKey: 'postId',
          },
        },
      },
      afterFindAll: (resource, data) => {
        return Promise.all(data.map(post => {
          return Post.create(post, {
            adapter: 'localforage',
          })
        }))
      },
    })
    Post.fields = [
      {
        key: 'title',
        type: 'input',
        templateOptions: {
          label: $translate.instant('FORM.POST.TITLE'),
          required: 'title',
        },
      },
      {
        key: 'body',
        type: 'textarea',
        templateOptions: {
          label: $translate.instant('FORM.POST.BODY'),
          required: 'body',
        },
      },
    ]
    return Post
  }
}

export {
  PostService,
}
