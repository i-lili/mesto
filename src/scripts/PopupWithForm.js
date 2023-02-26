import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  // Принимает в конструктор селектор попапа и колбэк сабмита формы
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
    this._formElement = this._popupElement.querySelector(".popup__form");
  }

  // Приватный метод _getInputValues, который собирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  // Метод добавляет обработчик клика иконке закрытия, добавляет обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться
  close() {
    super.close();
    this._formElement.reset();
  }
}
