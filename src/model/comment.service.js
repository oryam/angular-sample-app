class CommentService {
  /**
   * @ngInject
   */
  constructor(DS) {
    return DS.defineResource({
      name: 'comment',
      endpoint: 'comment',
      idAttribute: 'id',
      relations: {
        belongsTo: {
          post: {
            localField: 'post',
            localKey: 'postId',
          },
        },
      },
    })
  }
}

export {
  CommentService,
}
