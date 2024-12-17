/** 
 * Отрисовщик элементов страницы 
 */
export class Section {

  /** 
   * Конструктор элемента
   * @param items - массив данных, добавляемых на страницу при инициализации класса
   * @param renderer - ф-я создающая и отрисовывающая данные
   * @param containerSelector - селектор контейнера, в который добавляются созданные элементы
   */
  constructor({renderer}, containerSelector) {
    this._renderer = renderer; // сохраняем функцию отрисовки элементов
    this._container = document.querySelector(containerSelector); // находим контейнер для элементов по селектору
  }

  /** 
   * Добавляет элемент в конец контейнера
   * @param element - добавляемый DOM-элемент 
   */
  addItem(element){
    this._container.append(element); // добавляем элемент в конец контейнера
  }

  /** 
   * Добавляет созданный элемент в начало контейнера
   * @param element - добавляемый DOM-элемент 
   */
  addNewItem(element){
    this._container.prepend(element); // добавляем элемент в начало контейнера
  }

  /** 
   * Отрисовывает элементы (вначале очищает содержимое контейнера) 
   */
  renderElements(items){
    this._container.innerHTML = ''; // очищаем контейнер
    items.forEach((element) => { // перебираем все элементы
      this._renderer(element); // вызываем функцию отрисовки для каждого элемента
    });
  }

}
