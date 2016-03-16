class MenuProvider {
  constructor() {
    this.items = []
  }

  /**
   * add an item to the menu (provider method, can only be used in the config method)
   * @param menuItem
   * @return {MenuProvider}
   */
  addMenu(menuItem) {
    this.items.push(menuItem)
    return this
  }

  /**
   * Constructor of the afMenu service
   * @return {{items: Array}}
   */
  $get() {
    const items = this.items
    return {
      items,
    }
  }
}

export {
  MenuProvider,
}
