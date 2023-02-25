import { Popup } from "./Popup.js";
//класс PopupWithImage, который наследует от Popup.
// Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this._popupElement.querySelector(".popup__image");
    this._popupCaption = this._popupElement.querySelector(".popup__caption");
  }

  open(title, link) {
    this._popupImage.src = link;
    this._popupImage.alt = title;
    this._popupCaption.textContent = title;
    super.open();
  }
}
