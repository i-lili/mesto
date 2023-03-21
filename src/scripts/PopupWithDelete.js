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

  // Переопределяем метод открытия всплывающего окна
  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector(".popup__button-delete")
      .addEventListener("click", (evt) => {
        this._submitHandler();
      });
  }
}
