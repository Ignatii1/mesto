export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(renderedItems) {
    this.clear();
    renderedItems.forEach(item => {
      this.addItem(item);
    })
  }
}
