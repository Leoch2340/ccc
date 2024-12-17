export class FormValidator {
  constructor(validationSettings, form) {
    this._popupInput = validationSettings.inputSelector; // сохраняем селектор для инпутов
    this._popupSubmit = validationSettings.submitButtonSelector; // сохраняем селектор для кнопки отправки
    this._popupSubmitDisabled = validationSettings.inactiveButtonClass; // сохраняем класс для неактивной кнопки
    this._popupInputTypeError = validationSettings.inputErrorClass; // сохраняем класс для ошибки инпута
    this._popupErrorVisible = validationSettings.errorClass; // сохраняем класс для видимой ошибки
    this._formToValidate = form; // сохраняем форму для валидации
    this._submitButton = this._formToValidate.querySelector(this._popupSubmit); // находим кнопку отправки формы
    this._inputArray = this._formToValidate.querySelectorAll(this._popupInput); // находим все инпуты в форме
  }

  /** 
   * Включает ошибку валидации инпута
   * @param input - валидируемый инпут
   * @param message - сообщение об ошибке
   * @private 
   */
  _showInputError(input, message) {
    const error = this._formToValidate.querySelector(`#${input.id}-error`); // находим элемент ошибки

    error.textContent = message; // отображаем сообщение об ошибке

    input.classList.add(this._popupInputTypeError); // добавляем класс для инпута с ошибкой
    error.classList.add(this._popupErrorVisible); // показываем ошибку
  }

  /** 
   * Выключает ошибку валидации инпута
   * @param input - валидируемый инпут
   * @private 
   */
  _hideInputError(input) {
    const error = this._formToValidate.querySelector(`#${input.id}-error`); // находим элемент ошибки
    error.textContent = ""; // очищаем сообщение об ошибке
    input.classList.remove(this._popupInputTypeError); // убираем класс для инпута с ошибкой
    error.classList.remove(this._popupErrorVisible); // скрываем ошибку
  }

  /** 
   * Валидация инпута
   * Если инпут не прошел валидацию (?) показывает ошибку, иначе (:) убирает ошибку
   * @param input - элемент формы
   * @private 
   */
  _validateInput(input) {
    !input.validity.valid ? this._showInputError(input, input.validationMessage) : this._hideInputError(input); // если инпут не валиден, показываем ошибку, иначе убираем
  }

  /** 
   * Переключает состояние кнопки отправки формы
   */
  switchSubmitButton() {
    if (Array.from(this._inputArray).filter(input => !input.validity.valid).length === 0) { // если все инпуты валидны
      this._submitButton.disabled = false; // делаем кнопку отправки активной
      this._submitButton.classList.remove(this._popupSubmitDisabled); // убираем класс для неактивной кнопки
    } else {
      this._submitButton.disabled = true; // если есть невалидные инпуты, делаем кнопку отправки неактивной
      this._submitButton.classList.add(this._popupSubmitDisabled); // добавляем класс для неактивной кнопки
    }
  }

  /** 
   * Валидирует инпуты, прячет ошибки валидации (при открытии формы)
   */
  validateInputs() {
    this._inputArray.forEach((input) => {
      this._validateInput(input); // валидируем каждый инпут
      this._hideInputError(input); // прячем ошибки для инпутов
    });
  }

  /** 
   * Создание прослушивателей
   * @private 
   */
  _setInputEvtListeners() {
    this._formToValidate.addEventListener('submit', (evt) => {
      evt.preventDefault(); // предотвращаем отправку формы
    });

    /** Вешаем прослушиватель input каждому инпуту */
    this._inputArray.forEach((input) => {
      input.addEventListener('input', () => {
        /** Валидация инпута, включает/выключает ошибки */
        this._validateInput(input); // валидируем инпут

        /** Переключалка состояния кнопки отправки формы */
        this.switchSubmitButton(); // переключаем состояние кнопки отправки
      });
    });
  }

  /** 
   * Функция включения валидации
   */
  enableValidation() {
    this._setInputEvtListeners(this._formToValidate); // добавляем прослушиватели для инпутов
  }
}
