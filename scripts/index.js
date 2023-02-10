import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// Закрытие попапа нажатием на Esc
const closePopupByEsc = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");

    closePopup(popup);
  }
};

// Закрытие попапа нажатием на оверлей
const closePopupByOverlay = (e) => {
  if (!e.target.closest(".popup__container"))
    closePopup(e.target.closest(".popup"));
};

// Закрытие попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
  // Закрытие попапа нажатием на Esc
  document.removeEventListener("keyup", closePopupByEsc);
};

// Открытие попапа
export const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
  // Открытие попапа нажатием на Esc
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
editPopupOpenButtonElement.addEventListener("click", () => {
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

// Открытие формы добавления карточки
addPopupOpenButtonElement.addEventListener("click", () => {
  openPopup(addPopup);
});

// Создание экземпляра класса Card для каждой карточки
initialCards.forEach((cardData) => {
  const card = new Card(cardData, initialTemplate);
  cardElements.appendChild(card.getCard());
});

// Добавление карточки и закрытие попапа
const handleFormAddSubmit = (e) => {
  e.preventDefault();

  const newCard = new Card(
    {
      title: titleInput.value,
      link: linkInput.value,
    },
    initialTemplate
  );

  cardElements.prepend(newCard.getCard());

  closePopup(addPopup);
  formElementAdd.reset();
};

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
