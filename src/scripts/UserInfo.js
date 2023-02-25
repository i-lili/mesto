//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
  // Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  // Публичный метод, который возвращает объект с данными пользователя.
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  // Публичный метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
