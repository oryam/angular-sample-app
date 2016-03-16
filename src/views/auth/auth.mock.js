/*eslint disable*/
class $authMock {
  constructor() {

  }

  login(work) {
    return new Promise((resolve, reject) => {
      if (work) {
        resolve()
      }else {
        reject()
      }
    })
  }

  signup(work) {
    return new Promise((resolve, reject) => {
      if (work) {
        resolve()
      }else {
        reject()
      }
    })
  }

  authenticate(work) {
    return new Promise((resolve, reject) => {
      if (work) {
        resolve()
      }else {
        reject()
      }
    })
  }
}

export {
  $authMock,
}
