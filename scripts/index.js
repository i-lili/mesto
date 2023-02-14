import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// Переменные
const editPopup = document.querySelector("#edit-popup");
const addPopup = document.querySelector("#add-popup");

const imagePopup = document.querySelector("#image-popup");

const popupCloseButtonElements = document.querySelectorAll(".popup__close");
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

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const cardElements = document.querySelector(".elements");
const initialTemplate = "#element-template";

// Закрытие попапа нажатием на Esc
const closePopupByEsc = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");

    closePopup(popup);
  }
};

// Закрытие попапа нажатием на оверлей
const closePopupByOverlay = (e) => {
  if (e.target.classList.contains("popup")) {
    closePopup(e.target);
  }
};

// Закрытие попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
  // Закрытие попапа нажатием на Esc
  document.removeEventListener("keyup", closePopupByEsc);
};

// Открытие попапа
const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
  // Закрытие попапа нажатием на Esc
  document.addEventListener("keyup", closePopupByEsc);
};

// Закрытие попапов
popupCloseButtonElements.forEach((button) => {
  const popup = button.closest(".popup");

  popup.addEventListener("mousedown", closePopupByOverlay);

  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

// Открытие формы редактирования профиля
popupEditOpenButtonElement.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});

// Редактирование профиля и закрытие попапа
function handleProfileFormSubmit(e) {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(editPopup);
}

// Отправка формы
formElementEdit.addEventListener("submit", handleProfileFormSubmit);

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

// Кнопка добавления новой карточки не активна при первом открытии попапа, не позволяет добавить пустую карточку.
// Кнопка не активна если карточку добавили и открыли попап снова.
popupAddOpenButtonElement.addEventListener("click", () => {
  formElementAdd.reset();
  openPopup(addPopup);
  formValidatorAdd.resetValidation();
});

// Функция открытия попапа с картинкой
function handleCardClick(title, link) {
  popupImage.src = link;
  popupImage.alt = title;
  popupCaption.textContent = title;
  openPopup(imagePopup);
}

// Функция createCard возвращает готовую карточку с уже установленными обработчиками через return
function createCard(cardData) {
  const card = new Card(cardData, initialTemplate, handleCardClick);
  const cardElement = card.createCard();

  return cardElement;
}

// Добавление карточек из массива initialCards
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardElements.append(cardElement);
});

// Добавление карточки и закрытие попапа
function handleFormAddSubmit(e) {
  e.preventDefault();

  const cardData = {
    title: titleInput.value,
    link: linkInput.value,
  };

  const cardElement = createCard(cardData);
  cardElements.prepend(cardElement);

  closePopup(addPopup);
}

// Отправка формы
formElementAdd.addEventListener("submit", handleFormAddSubmit);

// Объявление переменных для валидации
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//Создание экземпляра класса FormValidator для каждой проверяемой формы
const formValidatorEdit = new FormValidator(settings, formElementEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(settings, formElementAdd);
formValidatorAdd.enableValidation();
