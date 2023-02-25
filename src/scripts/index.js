import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

import "../pages/index.css";

const popupEditOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);
const formElementEdit = document.querySelector('[name="edit"]');
const formElementAdd = document.querySelector('[name="add"]');
const nameInput = document.querySelector(".popup__input_item_name");
const jobInput = document.querySelector(".popup__input_item_job");
const titleInput = document.querySelector(".popup__input_item_title");
const linkInput = document.querySelector(".popup__input_item_link");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const popupAddOpenButtonElement = document.querySelector(
  ".profile__add-button"
);
const cardElements = document.querySelector(".elements");
const initialTemplate = "#element-template";
// Объявление переменных для валидации
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
// Экземпляр класса PopupWithForm для редактирования профиля
const editPopup = new PopupWithForm("#edit-popup", handleProfileFormSubmit);
// Экземпляр класса PopupWithForm для добавления карточки
const addPopup = new PopupWithForm("#add-popup", handleFormAddSubmit);
// Экземпляр класса PopupWithImage для открытия картинки
const imagePopup = new PopupWithImage("#image-popup");
// Экземпляр класса userInfo для отображения данных профиля
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

// Обработка события отправки формы профиля и закрытие всплывающего окна редактирования профиля
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  editPopup.close();
}

// Обработка события отправки формы добавления карты
function handleFormAddSubmit() {
  renderer({
    title: titleInput.value,
    link: linkInput.value,
  });
}

// Открытие попапа с картинкой
function handleCardClick(title, link) {
  imagePopup.open(title, link);
}

// Прослушиватели событий для всплывающих окон
editPopup.setEventListeners();
addPopup.setEventListeners();
imagePopup.setEventListeners();

// Шесть карточек «из коробки»
const initialCards = [
  {
    title: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    title: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    title: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    title: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    title: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    title: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Открытие формы добавления карты
popupAddOpenButtonElement.addEventListener("click", () => {
  formElementAdd.reset();
  formValidatorAdd.resetValidation();
  addPopup.open();
});

// Открытие формы редактирования профиля
popupEditOpenButtonElement.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  jobInput.value = userData.job;

  formValidatorEdit.resetValidation();

  editPopup.open();
});

// Функция осуществляет отрисовку каждого отдельного элемента.
function renderer(item) {
  // Создаем экземпляр класса Card
  const card = new Card(item, initialTemplate, handleCardClick);
  const cardElement = card.createCard();

  cardElements.prepend(cardElement);

  addPopup.close();
}

// Создаем экземпляр класса Section с передачей двух аргументов в конструктор
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      renderer(item);
    },
  },
  ".elements"
);
// Отрисовка карточек
cardList.renderItems();

// Валидация формы редактирования профиля
const formValidatorEdit = new FormValidator(settings, formElementEdit);
formValidatorEdit.enableValidation();

// Валидация формы добавления карточки
const formValidatorAdd = new FormValidator(settings, formElementAdd);
formValidatorAdd.enableValidation();
