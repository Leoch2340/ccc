/** Открывает и закрывает всплывашки */
export class Popup {

  /** 
   * Конструктор всплывашки
   * @param popupSelector - селектор всплывашки 
   */
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); // находим элемент всплывашки по селектору
    this._handleEsc = (evt) => { // создаём обработчик для события нажатия ESC
      this._handleEscClose(evt); // передаем событие в метод закрытия по ESC
    }
  }

  /** 
   * Открывает всплывашку, добавляет прослушиватель нажатия на ESC
   */
  open() {
    this._popup.classList.add('popup_opened'); // добавляем класс для отображения всплывашки
    document.addEventListener('keydown', this._handleEsc); // добавляем обработчик для нажатия клавиши ESC
  }

  /** 
   * Закрывает всплывашку, удаляет прослушиватель нажатия на ESC
   */
  close() {
    this._popup.classList.remove('popup_opened'); // убираем класс для скрытия всплывашки
    document.removeEventListener('keydown', this._handleEsc); // удаляем обработчик нажатия клавиши ESC
  }

  /** 
   * Закрывает всплывашку по нажатию ESC
   * @private 
   */
  _handleEscClose(evt) {
    if (evt.key === 'Escape') { // проверяем, была ли нажата клавиша Escape
      this.close(); // если да, закрываем всплывашку
    }
  }

  /** 
   * Добавляет прослушиватель нажатия на оверлей или кнопку закрытия
   */
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => { // добавляем обработчик кликов по всплывашке
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) { // если клик был по оверлею или кнопке закрытия
        this.close(); // закрываем всплывашку
      }
    });
  }

}
