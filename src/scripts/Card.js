export class Card {
  // Конструктор принимает данные и селектор template-элемента класса Card
  constructor(data, templateSelector, handleCardClick) {
    this._title = data.title;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  // Публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
  createCard() {
    this._cardElement = this._getTemplate();

    // Элементы для заголовка и ссылки
    const cardTitle = this._cardElement.querySelector(".element__title");
    this._cardImage = this._cardElement.querySelector(".element__image");
    // Элементы для кнопок
    this._cardLikeButton = this._cardElement.querySelector(".element__like");
    this._cardDeleteButton = this._cardElement.querySelector(".element__trash");

    // Устанавливаем прослушиватели событий
    this._setEventListeners();

    // Заполняем элементы данными
    cardTitle.textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = `Image: ${this._title}`;

    // Возвращаем готовую карточку
    return this._cardElement;
  }

  // Приватный метод для установки слушателей событий
  _setEventListeners() {
    // Слушатель клика по кнопке лайка
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });

    // Слушатель клика по кнопке удаления
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });

    // Слушатель клика по картинке
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    });
  }

  // Приватный метод для клонирования template-элемента
  _getTemplate() {
    this._cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return this._cardElement;
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
}
