export const popupEditOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);
export const formElementEdit = document.querySelector('[name="edit"]');
export const formElementAdd = document.querySelector('[name="add"]');
export const nameInput = document.querySelector(".popup__input_item_name");
export const jobInput = document.querySelector(".popup__input_item_job");
export const titleInput = document.querySelector(".popup__input_item_title");
export const linkInput = document.querySelector(".popup__input_item_link");
export const popupAddOpenButtonElement = document.querySelector(
  ".profile__add-button"
);
export const cardsContainer = document.querySelector(".elements");
export const initialTemplate = "#element-template";
// Объявление переменных для валидации
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Шесть карточек «из коробки»
export const initialCards = [
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
