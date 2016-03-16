/*eslint no-unused-vars:0*/
class UserService {
  /**
   * @param afPost
   * @param DS
   * @ngInject
   */
  constructor(DS, afPost) {
    return DS.defineResource({
      name: 'user',
      endpoint: 'user',
      idAttribute: 'id',
      relations: {
        hasMany: {
          post: {
            localField: 'posts',
            foreignKey: 'userId',
          },
        },
      },
    })
  }
}

export {
  UserService,
}
