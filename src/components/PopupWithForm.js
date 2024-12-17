import {Popup} from './Popup.js'

/** 
 * Открывает и закрывает всплывашку с формой 
 */
export class PopupWithForm extends Popup {

  /** 
   * Конструктор всплывашки с формой
   * @param popupSelector - селектор всплывашки
   * @param handleSubmitForm - обработчик отправки формы 
   */
  constructor(popupSelector, {handleSubmitForm}) {
    super(popupSelector); // вызываем конструктор родительского класса Popup
    this._handleSubmitForm = handleSubmitForm; // сохраняем обработчик отправки формы
    this._form = this._popup.querySelector('.popup__form'); // находим форму внутри всплывашки
    this._inputList = this._form.querySelectorAll('.popup__input'); // находим все инпуты в форме
    this._submitbutton = this._popup.querySelector('.popup__submit'); // находим кнопку отправки формы
  }

  /** 
   * Получает значения инпутов формы всплывашки
   * @returns {*|{}} - объект с названиями инпутов и их значениями: {название: значение}
   * @private 
   */
  _getInputValues() {
    this._formValues = {}; // создаем пустой объект для хранения значений
    this._inputList.forEach((input) => { // перебираем все инпуты формы
      this._formValues[input.name] = input.value; // сохраняем имя инпута как ключ, а значение - как значение
    });
    return this._formValues; // возвращаем объект с значениями инпутов
  }

  /** 
   * Устанавливает прослушиватели для формы
   */
  setEventListeners() {
    super.setEventListeners(); // устанавливаем прослушиватели родительского класса Popup
    this._form.addEventListener('submit', () => { // добавляем обработчик на отправку формы
      this.renderLoading(true); // показываем загрузку
      this._handleSubmitForm(this._getInputValues()); // вызываем обработчик с переданными значениями инпутов
    });
  }

  /** 
   * Закрывает всплывашку и сбрасывает форму
   */
  close() {
    super.close(); // вызываем закрытие всплывашки из родительского класса
    this._form.reset(); // сбрасываем значения формы
  }

  /** 
   * Отображает состояние загрузки на кнопке отправки
   * @param isLoading - состояние загрузки (true - загрузка, false - завершение)
   */
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitbutton.textContent = 'Сохранение...'; // меняем текст на кнопке на "Сохранение..."
    } else {
      this._submitbutton.textContent = this._submitbutton.dataset.value; // восстанавливаем исходный текст кнопки
    }
  }

}
