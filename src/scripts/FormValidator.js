export class FormValidator {
  // Конструктор принимает объект настроек с селекторами и классами формы
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._inputs = this._form.querySelectorAll(this._settings.inputSelector);
    this._button = this._form.querySelector(
      this._settings.submitButtonSelector
    );
    this._setHandlers();
  }

  // Приватный метод для проверки валидности поля
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  // Приватный метод для отображения ошибки
  _showError(input, errorMessage) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._settings.inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._settings.errorClass);
  }

  // Приватный метод для удаления ошибки
  _hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._settings.inputErrorClass);
    error.classList.remove(this._settings.errorClass);
    error.textContent = "";
  }

  // Приватный метод для изменения состояния кнопки сабмита
  _toggleButton() {
    const isValid = [...this._inputs].every((input) => input.validity.valid);
    if (isValid) {
      this._button.classList.remove(this._settings.inactiveButtonClass);
      this._button.disabled = false;
    } else {
      this._button.classList.add(this._settings.inactiveButtonClass);
      this._button.disabled = true;
    }
  }

  // Приватный метод для установки всех обработчиков
  _setHandlers() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButton();
      });
    });
  }

  // Публичный метод, который сбрасывает валидацию формы
  resetValidation() {
    this._toggleButton();

    this._inputs.forEach((input) => {
      this._hideError(input);
    });
  }

  // Публичный метод enableValidation, который включает валидацию формы
  enableValidation() {
    this._setHandlers();
  }
}
