// Валидация  форм
const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`);

  // показать ошибку
  if (input.validity.valid) {
    // убрать ошибку
    error.textContent = "";
    error.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  } else {
    // показать
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
  }
};

// Если хотя бы одно из полей не прошло валидацию, кнопка «Сохранить» должна быть неактивной.
const toggleButton = (inputs, button, config) => {
  const isFormValid = inputs.every((input) => input.validity.valid);

  if (isFormValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = "";
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = "disabled";
  }
};

// enableValidation ответственна за включение валидации всех форм.
// Она принимает как объект настроек нужные функциям классы и селекторы элементов.
const enableValidation = (config) => {
  const forms = [...document.querySelectorAll(config.formSelector)];

  forms.forEach((form) => {
    const inputs = [...form.querySelectorAll(config.inputSelector)];
    const button = form.querySelector(config.submitButtonSelector);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    // Кнопка добавления новой карточки не активна при первом открытии попапа, не позволяет добавить пустую карточку.
    // Кнопка не активна если карточку добавили и открыли попап снова.
    toggleButton(inputs, button, config);
    form.addEventListener("reset", () => {
      setTimeout(() => {
        toggleButton(inputs, button, config);
      }, 0);
    });

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        // показать ошибку
        checkInputValidity(input, config);
        // отключить кнопку
        toggleButton(inputs, button, config);
      });
    });
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error",
});
