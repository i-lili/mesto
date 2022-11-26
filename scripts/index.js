// Открытие и закрытие popup

const popupElement = document.querySelector(".popup");

const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");

const openPopup = function () {
  popupElement.classList.add("popup_is-opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const closePopup = function () {
  popupElement.classList.remove("popup_is-opened");
};

// Редактированиe профиля

const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_item_name");
const jobInput = formElement.querySelector(".popup__input_item_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
