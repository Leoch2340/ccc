import {Popup} from './Popup.js';

/** 
 * Открывает и закрывает всплывашку с изображением 
 */
export class PopupWithImage extends Popup{

  /** 
   * Конструктор всплывашки с изображением
   * @param popupSelector - селектор всплывашки 
   */
  constructor(popupSelector){
    super(popupSelector); // вызываем конструктор родительского класса Popup
    this._image = this._popup.querySelector('.popup__image'); // находим элемент изображения
    this._caption = this._popup.querySelector('.popup__caption'); // находим элемент для подписи изображения
  }

  /** 
   * Открывает всплывашку, вставляет картинку и название картинки
   * @param title - название
   * @param src - ссылка на изображение 
   */
  open({title, src}){
    this._image.src = src; // задаем источник изображения
    this._image.alt = title; // задаем альтернативный текст для изображения
    this._caption.textContent = title; // задаем текст подписи для изображения
    super.open(); // вызываем метод открытия всплывашки из родительского класса
  }
}
