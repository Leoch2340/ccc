/** 
 * Отображает информацию о пользователе на странице 
 */
export class UserInfo {

  /** 
   * Конструктор
   * @param profileTitle - селектор элемента с именем пользователя на странице
   * @param profileAbout - селектор элемента с подписью пользователя на странице
   * @param profileAvatar - селектор изображения с аватаром пользователя на странице
   */
  constructor({profileTitle, profileAbout, profileAvatar}) {
    this._title = document.querySelector(profileTitle); // находим элемент с именем пользователя
    this._about = document.querySelector(profileAbout); // находим элемент с подписью пользователя
    this._avatar = document.querySelector(profileAvatar); // находим элемент с аватаром пользователя
  }

  /** 
   * Получает информацию о пользователе из разметки
   * @returns {*|{about: *, title: *, avatar: *}} - объект с именем, подписью и аватаром
   */
  getUserInfo() {
    this._info = {
      title: this._title.textContent, // получаем текст имени пользователя
      about: this._about.textContent, // получаем текст подписи пользователя
      avatar: this._avatar.src // получаем источник изображения аватара
    };
    return this._info; // возвращаем объект с данными
  }

  /** 
   * Добавляет новые данные пользователя на страницу
   * @param info - объект с именем, подписью и аватаром
   */
  setUserInfo(info) {
    this._title.textContent = info.name; // обновляем имя пользователя
    this._about.textContent = info.about; // обновляем подпись пользователя
    this._avatar.src = info.avatar; // обновляем аватар пользователя
  }
}
