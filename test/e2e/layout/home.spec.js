'use strict'

const HomePage = require('./pages/Home')

describe('Angular formation', () => {
  let page
  beforeEach(() => {
    page = new HomePage()
    page.get()
  })
  it('should have Home bind on title', () => {
    expect(page.getH1().getText()).toEqual('Home')
  })
  it('should have displayed the correct message wen cicked 1 time', () => {
    page.getH1().click()
    expect(page.getMessage().getText()).toEqual('clicked 1 times')
  })
  it('should have displayed the correct message wen clicked 3 times', () => {
    page.getH1().click()
    page.getH1().click()
    page.getH1().click()
    expect(page.getMessage().getText()).toEqual('clicked 3 times')
  })
})
