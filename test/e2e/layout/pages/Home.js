'use strict'

/*eslint no-undef:0*/
class HomePage {
  get() {
    browser.get('/#/home')
  }
  getH1() {
    return element(by.tagName('h1'))
  }
  getMessage() {
    return element(by.binding('vm.message'))
  }
}

module.exports = HomePage
