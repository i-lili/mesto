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
};

const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
  // Открытие попапа нажатием на Esc
  document.addEventListener("keyup", closePopupByEsc);
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

  popup.addEventListener("mousedown", closePopupByOverlay);

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
const renderCard = (item, wrapElement) => {
  const element = createElement(item);
  wrapElement.prepend(element);
};

initialCards.forEach(function (item) {
  renderCard(item, cardElements);
});

// Редактирование, закрытие попапа и очистка формы
const handleFormAddSubmit = (e) => {
  e.preventDefault();

  const initial = {
    title: titleInput.value,
    link: linkInput.value,
  };
  renderCard(initial, cardElements);
  closePopup(addPopup);
  e.target.reset();
};

// Отправка формы
formElementAdd.addEventListener("submit", handleFormAddSubmit);
