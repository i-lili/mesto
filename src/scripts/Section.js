export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //Публичный метод, который отвечает за отрисовку всех элементов
  renderItems(items) {
    items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  //Публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер
  addItem(item) {
    this._container.prepend(item);
  }
}
