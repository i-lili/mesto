// Импорт необходимых модулей и компонентов из соответствующих файлов
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Section } from "../scripts/Section.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { PopupWithDelete } from "../scripts/PopupWithDelete.js";
import { UserInfo } from "../scripts/UserInfo.js";
import "../pages/index.css";
import { Api } from "../scripts/Api.js";
import {
  popupEditOpenButtonElement,
  formElementEdit,
  formElementAdd,
  formElementAvatar,
  nameInput,
  aboutInput,
  titleInput,
  linkInput,
  popupAddOpenButtonElement,
  initialTemplate,
  avatarEditButton,
  savedUserData,
  savedCardsData,
  validationConfig,
} from "../utils/constants.js";

// Глобальная переменная, в которой будет храниться идентификатор текущего пользователя.
// Он будет использоваться для идентификации пользователя и получения его данных из API.
let currentUserId;

// Функция для отправки формы редактирования профиля
function handleProfileFormSubmit(data) {
  popupEditProfile.renderLoading();
  api
    .editUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.renderInitial();
    });
}

// Функция, которая вызывается при отправке формы для добавления новой карты.
function handleFormAddSubmit() {
  const newCardData = {
    name: titleInput.value,
    link: linkInput.value,
  };
  popupAddProfile.renderLoading();
  api
    .addNewCard(newCardData)
    .then((cardData) => {
      const newCardElement = createCard(cardData);
      cardsSection.addItem(newCardElement);
      popupAddProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddProfile.renderInitial();
    });
}

// Функция для отправки формы обновления аватара
function handleAvatarFormSubmit(data) {
  popupUpdateAvatar.renderLoading();
  api
    .updateAvatar(data.avatar)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      popupUpdateAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupUpdateAvatar.renderInitial();
    });
}

// Функция для обработки события нажатия на кнопку редактирования профиля
function handleEditProfileButtonClick() {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  aboutInput.value = userData.about;

  popupEditProfile.open();
}

// Функция для обработки события клика на карточке
function handleCardClick(name, link) {
  popupImageProfile.open(name, link);
}

// Функция для открытия всплывающего окна удаления карточки
function handleDeletePopupOpen(cardInstance) {
  popupDeleteCard.setSubmitAction(() => {
    api
      .deleteCard(cardInstance._id)
      .then(() => {
        cardInstance.remove();
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  popupDeleteCard.open();
}

// Функция принимает данные карты в качестве аргумента и создает новый экземпляр класса Card.
function createCard(cardData) {
  const card = new Card(
    cardData,
    initialTemplate,
    handleCardClick,
    currentUserId,
    handleDeletePopupOpen,
    (cardId, isLiked) => api.changeLikeCardStatus(cardId, isLiked)
  );
  const cardElement = card.createCard();

  return cardElement;
}

// Инициализация экземпляра класса API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "d14f3df3-8e7d-4c23-be34-6e27c8e1960e",
    "Content-Type": "application/json",
  },
});

// Инициализация экземпляров всплывающих окон и валидаторов форм
const popupEditProfile = new PopupWithForm(
  "#edit-popup",
  handleProfileFormSubmit
);
const popupAddProfile = new PopupWithForm("#add-popup", handleFormAddSubmit);
const popupUpdateAvatar = new PopupWithForm(
  "#avatar-popup",
  handleAvatarFormSubmit
);
const popupDeleteCard = new PopupWithDelete("#delete-popup");
const popupImageProfile = new PopupWithImage("#image-popup");

const formValidatorEdit = new FormValidator(validationConfig, formElementEdit);
const formValidatorAdd = new FormValidator(validationConfig, formElementAdd);
const formValidatorAvatar = new FormValidator(
  validationConfig,
  formElementAvatar
);

// Инициализация экземпляра UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

// Инициализация раздела карточек
const cardsSection = new Section(
  {
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardsSection.addItem(card);
    },
  },
  ".elements"
);

// Установка прослушивателей событий для всплывающих окон
popupEditProfile.setEventListeners();
popupAddProfile.setEventListeners();
popupImageProfile.setEventListeners();
popupDeleteCard.setEventListeners();
popupUpdateAvatar.setEventListeners();

// Настройка прослушивателей событий для добавления карточки
popupAddOpenButtonElement.addEventListener("click", () => {
  formValidatorAdd.resetValidation();
  popupAddProfile.open();
});

// Настройка прослушивателей событий для редактирования профиля
popupEditOpenButtonElement.addEventListener(
  "click",
  handleEditProfileButtonClick
);

// Настройка прослушивателя событий для кнопки обновления аватара
avatarEditButton.addEventListener("click", () => {
  formValidatorAvatar.resetValidation();
  popupUpdateAvatar.open();
});

// Включение проверки форм для редактирования профиля, добавления карточки и обновления аватара
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
formValidatorAvatar.enableValidation();

// Получение исходных данных из API и их рендеринг на странице
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([items, user]) => {
    currentUserId = user._id;
    cardsSection.renderItems(items);
    userInfo.setUserInfo(user);
  })
  .catch((err) => {
    console.log(err);
  });

// Проверяем, есть ли сохраненные пользовательские данные в локальном хранилище и загружаем их на страницу
if (savedUserData) {
  const userData = JSON.parse(savedUserData);
  userInfo.setUserInfo(userData);
}

// Сохранение пользовательских данных в локальном хранилище перед выгрузкой страницы
window.addEventListener("beforeunload", () => {
  const userData = userInfo.getUserInfo();
  localStorage.setItem("userData", JSON.stringify(userData));
});

// Проверяем, есть ли сохраненные пользовательские данные в локальном хранилище и загружаем их на страницу
if (savedCardsData) {
  const cardsData = JSON.parse(savedCardsData);
  cardsSection.renderItems(cardsData);
}

// Сохранение пользовательских данных в локальном хранилище перед выгрузкой страницы
window.addEventListener("beforeunload", () => {
  const cardsData = cardsSection.getItems();
  localStorage.setItem("cardsData", JSON.stringify(cardsData));
});
