// Переменные
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Section } from "../scripts/Section.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";
import "../pages/index.css";
import {
  popupEditOpenButtonElement,
  formElementEdit,
  formElementAdd,
  nameInput,
  jobInput,
  titleInput,
  linkInput,
  popupAddOpenButtonElement,
  cardsContainer,
  initialTemplate,
  validationConfig,
  initialCards,
} from "../utils/constants.js";

// Функции
// Обработка события отправки формы профиля и закрытие всплывающего окна редактирования профиля
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  popupEditProfile.close();
}

// Обработка события открытия формы редактирования профиля
function handleEditProfileButtonClick() {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  jobInput.value = userData.job;

  formValidatorEdit.resetValidation();

  popupEditProfile.open();
}

// Обработка события отправки формы добавления карты
function handleFormAddSubmit() {
  const card = cardData({
    title: titleInput.value,
    link: linkInput.value,
  });

  cardsSection.addItem(card);
  popupAddProfile.close();
}

// Открытие попапа с картинкой
function handleCardClick(title, link) {
  popupImageProfile.open(title, link);
}

// Функция осуществляет отрисовку каждого отдельного элемента
function cardData(item) {
  // Создаем экземпляр класса Card
  const card = new Card(item, initialTemplate, handleCardClick);
  const cardElement = card.createCard();

  return cardElement;
}

// Экземпляры
const popupEditProfile = new PopupWithForm(
  "#edit-popup",
  handleProfileFormSubmit
);
const popupAddProfile = new PopupWithForm("#add-popup", handleFormAddSubmit);
const popupImageProfile = new PopupWithImage("#image-popup");
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = cardData(item);
      cardsSection.addItem(card);
    },
  },
  ".elements"
);
const formValidatorEdit = new FormValidator(validationConfig, formElementEdit);
const formValidatorAdd = new FormValidator(validationConfig, formElementAdd);

// Слушатели событий
// Слушатели событий для всплывающих окон
popupEditProfile.setEventListeners();
popupAddProfile.setEventListeners();
popupImageProfile.setEventListeners();

// Открытие формы добавления карты
popupAddOpenButtonElement.addEventListener("click", () => {
  formValidatorAdd.resetValidation();
  popupAddProfile.open();
});

// Открытие формы редактирования профиля
popupEditOpenButtonElement.addEventListener(
  "click",
  handleEditProfileButtonClick
);

// Выполнение кода
// Отрисовка карточек
cardsSection.renderItems();
// Включение валидации форм редактирования профиля
formValidatorEdit.enableValidation();
// Включение валидации форм добавления карточки
formValidatorAdd.enableValidation();
