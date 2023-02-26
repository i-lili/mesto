export class Popup {
  //Принимает в конструктор единственный параметр — селектор попапа
  constructor(selector) {
    this._popupElement = document.querySelector(selector);
  }

  // Публичный метод, который отвечает за открытие попапа
  open() {
    this._popupElement.classList.add("popup_is-opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  // Публичный метод, который отвечает за закрытие попапа
  close() {
    this._popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  // Публичный метод, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    const buttonClose = this._popupElement.querySelector(".popup__close");
    buttonClose.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }

  // Приватный метод, который содержит логику закрытия попапа клавишей Esc
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
}
