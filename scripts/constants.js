const popupElement = document.querySelector(".popup");

const editPopup = document.querySelector("#edit-popup");
const addPopup = document.querySelector("#add-popup");

const imagePopup = document.querySelector("#image-popup");

const popupCloseButtonElements = document.querySelectorAll(".popup__close");
const editPopupOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);

const formElementEdit = document.querySelector('[name="edit"]');
const formElementAdd = document.querySelector('[name="add"]');

const nameInput = document.querySelector(".popup__input_item_name");
const jobInput = document.querySelector(".popup__input_item_job");

const titleInput = document.querySelector(".popup__input_item_title");
const linkInput = document.querySelector(".popup__input_item_link");

const elementTitle = document.querySelector(".element__title");
const elementImage = document.querySelector(".element__image");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const addPopupOpenButtonElement = document.querySelector(
  ".profile__add-button"
);

const cardElements = document.querySelector(".elements");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const initialTemplate = document
  .querySelector("#element-template")
  .content.querySelector(".element");
