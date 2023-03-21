import { Popup } from "./Popup.js";

// Класс PopupWithDelete наследует от класса Popup и представляет собой всплывающее окно с подтверждением удаления
export class PopupWithDelete extends Popup {
  constructor(selector) {
    super(selector);
    // Обработчик подтверждения удаления
    this._submitHandler = () => {};
  }

  // Метод для установки обработчика подтверждения удаления
  setSubmitAction(submitAction) {
    this._submitHandler = submitAction;
  }

  // Метод для обработки отправки формы
  _handleSubmit(evt) {
    evt.preventDefault();
    this._submitHandler();
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    // Установка слушателя события клика на кнопку "Да"
    this._popupElement
      .querySelector(".popup__button-delete")
      .addEventListener("click", (evt) => {
        // Обработка события отправки формы
        this._handleSubmit(evt);
      });
  }
}
