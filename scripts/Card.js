import { openPopup } from "./index.js";

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
    const cardElement = this._templateSelector.cloneNode(true);

    // Элементы для заголовка и ссылки
    const cardTitle = cardElement.querySelector(".element__title");
    const cardLink = cardElement.querySelector(".element__image");

    // Элементы для кнопок
    const cardDeleteButton = cardElement.querySelector(".element__trash");
    const cardLikeButton = cardElement.querySelector(".element__like");

    // Устанавливаем прослушиватели событий
    cardDeleteButton.addEventListener(
      "click",
      this._handleDeleteButtonClick.bind(this)
    );
    cardLikeButton.addEventListener(
      "click",
      this._handleLikeButtonClick.bind(this)
    );

    // Заполняем элементы данными
    cardTitle.textContent = this._title;
    cardLink.src = this._link;
    cardLink.alt = `Image: ${this._title}`;

    // Прослушиватель события для открытия попапа с картинкой
    cardLink.addEventListener("click", (e) => {
      popupImage.src = e.target.src;
      popupImage.alt = e.target.alt;
      popupCaption.textContent = cardTitle.textContent;
      openPopup(imagePopup);
    });

    return cardElement;
  }

  // Приватный метод для установки лайка
  _handleLikeButtonClick(e) {
    e.target.classList.toggle("element__like_active");
  }

  // Приватный метод для удаления карточки
  _handleDeleteButtonClick(e) {
    e.target.closest(".element").remove();
  }

  // Публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
  getCard() {
    return this._createCard();
  }
}
