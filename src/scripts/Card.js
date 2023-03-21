// Этот класс представляет карточку с изображением, описанием, а также функциями лайка и удаления.
export class Card {
  // Конструктор принимает данные карты, селектор элементов шаблона, обратные вызовы для обработки нажатия на карту, проверки владельца карты и открытия всплывающего окна удаления карты.
  constructor(
    data,
    templateSelector,
    handleCardClick,
    currentUserId,
    handleDeletePopupOpen,
    handleLikeCard
  ) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes || [];
    this._isOwner = data.owner._id === currentUserId;
    this._handleDeletePopupOpen = handleDeletePopupOpen;
    this._handleLikeCard = handleLikeCard;
    this._isLiked = this._likes.some((like) => like._id === currentUserId);
  }

  // Публичный метод для создания элемента карты DOM с данными и добавления прослушивателей событий.
  createCard() {
    this._cardElement = this._getTemplate();

    // Получаем элементы для названия карты и ссылки на изображение
    const cardName = this._cardElement.querySelector(".element__name");
    this._cardImage = this._cardElement.querySelector(".element__image");
    // Получаем элементы для кнопок карты
    this._cardLikeButton = this._cardElement.querySelector(".element__like");
    this._cardDeleteButton = this._cardElement.querySelector(".element__trash");

    this._cardLikeCount = this._cardElement.querySelector(
      ".element__like-count"
    );
    this._undateLikesCount();

    // Проверяем, является ли карточка уже отмеченной как "понравившейся"
    if (this._isLiked) {
      this._cardLikeButton.classList.add("element__like_active");
    }

    // Показывать кнопку удаления только на карточках, созданных пользователем
    if (!this._isOwner) {
      this._cardDeleteButton.remove();
    }

    // Установка слушателей событий
    this._setEventListeners();

    // Заполняем элементы карточки данными
    cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `Image: ${this._name}`;

    // Возвращаем заполненную карточку
    return this._cardElement;
  }

  // Приватный метод установки слушателей событий для карты
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
      this._handleCardClick(this._name, this._link);
    });
  }

  // Приватный метод клонирования шаблона карты
  _getTemplate() {
    this._cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return this._cardElement;
  }

  // Приватный метод обработки клика по кнопке лайка
  _handleLikeButtonClick() {
    const isLiked = this._cardLikeButton.classList.contains(
      "element__like_active"
    );
    this._handleLikeCard(this._id, !isLiked)
      .then((cardData) => {
        this.setLikesInfo(cardData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Публичный метод для установки информации о лайках
  setLikesInfo(cardData) {
    this._likes = cardData.likes;
    this._cardLikeButton.classList.toggle("element__like_active");
    this._undateLikesCount();
  }

  // Приватный метод обновления счетчика лайков
  _undateLikesCount() {
    this._cardLikeCount.textContent = this._likes.length;
  }

  // Публичный метод для удаления карточки из DOM
  remove() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // Приватный метод обработки клика по кнопке удаления карточки
  _handleDeleteButtonClick() {
    this._handleDeletePopupOpen(this);
  }
}
