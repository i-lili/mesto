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
    cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });
    cardLink.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    });

    // Заполняем элементы данными
    cardTitle.textContent = this._title;
    cardLink.src = this._link;
    cardLink.alt = `Image: ${this._title}`;

    // Возвращаем готовую карточку
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
