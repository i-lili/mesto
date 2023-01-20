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

  
// Закрытие попапа нажатием на Esc
const closePopupByEsc = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");

    closePopup(popup);
  }
};

// Закрытие попапа нажатием на overlay
const closePopupByOverlay = (e) => {
  if (!e.target.closest(".popup__container"))
    closePopup(e.target.closest(".popup"));
};

// Открытие и закрытие попапов
const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
  // Закрытие попапа нажатием на Esc
  document.removeEventListener("keyup", closePopupByEsc);
  // Закрытие попапа нажатием на overlay
  document.removeEventListener("click", closePopupByOverlay);
};

const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
  // Открытие попапа нажатием на Esc
  document.addEventListener("keyup", closePopupByEsc);
  // Открытие попапа нажатием на overlay
  document.addEventListener("click", closePopupByOverlay);
};

// Открытие формы редактирования профиля
editPopupOpenButtonElement.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});

// Закрытие попапа
popupCloseButtonElements.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

// Редактированиe и закрытие попапа
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

// Открытие формы добавления карточки
addPopupOpenButtonElement.addEventListener("click", () => {
  openPopup(addPopup);
});

// Создание карточки
function createElement(item) {
  const initial = initialTemplate.cloneNode(true);
  const initialTitle = initial.querySelector(".element__title");
  const initialLink = initial.querySelector(".element__image");

  const initialDeleteButton = initial.querySelector(".element__trash");
  const initialLikeButton = initial.querySelector(".element__like");

  initialDeleteButton.addEventListener("click", handleDeleteButtonClick);
  initialLikeButton.addEventListener("click", handleLikeButtonClick);

  initialTitle.textContent = item.title;
  initialLink.src = item.link;
  initialLink.alt = `Картинка: ${item.title}`;

  // Открытие попапа с картинкой
  initialLink.addEventListener("click", (e) => {
    popupImage.src = e.target.src;
    popupImage.alt = e.target.alt;
    popupCaption.textContent = initialTitle.textContent;
    openPopup(imagePopup);
  });

  return initial;
}

// Лайк карточки
const handleLikeButtonClick = (e) => {
  e.target.classList.toggle("element__like_active");
};

// Удаление карточки
const handleDeleteButtonClick = (e) => {
  e.target.closest(".element").remove();
};

// Добавление карточки в начало
const renderInitial = (item, wrapElement) => {
  const element = createElement(item);
  wrapElement.prepend(element);
};

initialCards.forEach(function (item) {
  renderInitial(item, cardElements);
});

// Редактирование, закрытие попапа и очистка формы
const handleFormSubmit = (e) => {
  e.preventDefault();

  const initial = {
    title: titleInput.value,
    link: linkInput.value,
  };
  renderInitial(initial, cardElements);
  closePopup(addPopup);
  e.target.reset();
};

// Отправка формы
formElementAdd.addEventListener("submit", handleFormSubmit);
