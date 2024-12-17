import {Popup} from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  /** 
   * Всплывашка с подтверждением, должна присутствовать form с селектором .popup__form
   * @param popupSelector - селектор всплывашки
   * @param handleSubmitDelete - хендлер по отправке формы 
   */
  constructor(popupSelector, {handleSubmitDelete}) {
    super(popupSelector); // вызываем конструктор родительского класса Popup
    this._handleSubmitDelete = handleSubmitDelete; // сохраняем хендлер для отправки формы
    this._form = this._popup.querySelector('.popup__form'); // находим форму внутри всплывашки
  }

  /** 
   * Установка прослушивателя отправки формы
   */
  setEventListeners() {
    super.setEventListeners(); // устанавливаем прослушиватели родительского класса Popup
    this._form.addEventListener('submit', (evt) => { // добавляем обработчик на отправку формы
      evt.preventDefault(); // предотвращаем стандартное поведение формы
      this._handleSubmitDelete(this._idCard, this._card); // вызываем хендлер с передачей id и элемента карточки
    });
  }

  /** 
   * Получает карточку для удаления
   * @param id - id карточки
   * @param element - элемент карточки
   */
  getCard(id, element) {
    this._clear(); // очищаем данные карточки перед получением новых
    this._idCard = id; // сохраняем id карточки
    this._cardElement = element; // сохраняем элемент карточки
  }

  /** 
   * Открывает всплывашку и передает карточку
   * @param card - карточка, которая должна быть подтверждена для удаления
   */
  open(card) {
    this._card = card; // сохраняем карточку, переданную в метод
    super.open(); // открываем всплывашку с помощью родительского метода
  }

  /** 
   * Очистка id карточки, элемента карточки
   * @private 
   */
  _clear() {
    this._idCard = ''; // очищаем id карточки
    this._cardElement = ''; // очищаем элемент карточки
  }
}
