import { openPopup, popupImage, popupCaption, imagePopup } from "./index.js";

export class Card {
  // Конструктор принимает данные и селектор template-элемента класса Card
  constructor(data, templateSelector) {
    this._title = data.title;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  // Приватный метод для работы с разметкой и установки прослушивателей событий
  _createCard() {
    // Клонируем template-элемент
    this._cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    // Элементы для заголовка и ссылки
    const cardTitle = this._cardElement.querySelector(".element__title");
    const cardLink = this._cardElement.querySelector(".element__image");

    // Элементы для кнопок
    const cardDeleteButton = this._cardElement.querySelector(".element__trash");
    this._cardLikeButton = this._cardElement.querySelector(".element__like");

    // Устанавливаем прослушиватели событий
    cardLink.addEventListener("click", (e) => this._handleCardClick(e));
    this._cardLikeButton.addEventListener("click", (e) =>
      this._handleLikeButtonClick(e)
    );
    cardDeleteButton.addEventListener("click", (e) =>
      this._handleDeleteButtonClick(e)
    );

    // Заполняем элементы данными
    cardTitle.textContent = this._title;
    cardLink.src = this._link;
    cardLink.alt = `Image: ${this._title}`;

    // Возвращаем готовую карточку
    return this._cardElement;
  }

  // Приватный метод для открытия попапа с картинкой
  _handleCardClick(e) {
    popupImage.src = e.target.src;
    popupImage.alt = e.target.alt;
    popupCaption.textContent = e.target.alt;

    openPopup(imagePopup);
  }

  // Приватный метод для установки лайка
  _handleLikeButtonClick() {
    this._cardLikeButton.classList.toggle("element__like_active");
  }

  // Приватный метод для удаления карточки
  _handleDeleteButtonClick() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
  generateCard() {
    this._createCard();
    return this._cardElement;
  }
}
