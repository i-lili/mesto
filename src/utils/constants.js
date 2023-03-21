export const popupEditOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);
export const formElementEdit = document.querySelector('[name="edit"]');
export const formElementAdd = document.querySelector('[name="add"]');
export const formElementAvatar = document.querySelector('[name="avatar"]');

export const nameInput = document.querySelector(".popup__input_item_name");
export const aboutInput = document.querySelector(".popup__input_item_about");
export const titleInput = document.querySelector(".popup__input_item_title");
export const linkInput = document.querySelector(".popup__input_item_link");
export const avatarInput = document.querySelector(".popup__input_item_avatar");

export const popupAddOpenButtonElement = document.querySelector(
  ".profile__add-button"
);
export const initialTemplate = "#element-template";

export const avatarEditButton = document.querySelector(
  ".profile__avatar-edit-button"
);

export const savedUserData = localStorage.getItem("userData");
export const savedCardsData = localStorage.getItem("cardsData");

// Объявление переменных для валидации
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
