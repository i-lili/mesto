export class FormValidator {
  
  // Конструктор принимает объект настроек с селекторами и классами формы
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  // Приватный метод для проверки валидности поля
  _checkInputValidity(input) {
    const error = document.querySelector(`#${input.id}-error`);

    if (input.validity.valid) {
      // убрать ошибку
      error.textContent = "";
      error.classList.remove(this._settings.errorClass);
      input.classList.remove(this._settings.inputErrorClass);
    } else {
      // показать ошибку
      error.textContent = input.validationMessage;
      error.classList.add(this._settings.errorClass);
      input.classList.add(this._settings.inputErrorClass);
    }
  }

  // Приватный метод для изменения состояния кнопки сабмита
  _toggleButton(inputs, button) {
    const isFormValid = inputs.every((input) => input.validity.valid);

    if (isFormValid) {
      button.classList.remove(this._settings.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this._settings.inactiveButtonClass);
      button.disabled = true;
    }
  }

  // Приватный метод для установки всех обработчиков
  _setHandlers() {
    const inputs = [
      ...this._form.querySelectorAll(this._settings.inputSelector),
    ];
    const button = this._form.querySelector(
      this._settings.submitButtonSelector
    );

    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    // Кнопка добавления новой карточки не активна при первом открытии попапа, не позволяет добавить пустую карточку.
    // Кнопка не активна если карточку добавили и открыли попап снова.
    this._toggleButton(inputs, button);
    this._form.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButton(inputs, button);
      }, 0);
    });

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        // показать ошибку
        this._checkInputValidity(input);
        // отключить кнопку
        this._toggleButton(inputs, button);
      });
    });
  }

  // Публичный метод enableValidation, который включает валидацию формы
  enableValidation() {
    this._setHandlers();
  }
}


