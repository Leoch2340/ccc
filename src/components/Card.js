export class Card {
  /** 
   * Конструктор карточки
   * @param currentUser - id залогиненного пользователя, полученное перед отрисовкой карточек
   * @param handleCardClick - ф-я, открывающая всплывашку изображения при клике на картинку
   * @param handleDeleteCard - ф-я, открывающая всплывашку подтверждения удаления карточки
   * @param handleLikeCard - ф-я, ставящая/удаляющая лайк
   * @param cardTemplateSelector - селектор шаблона карточки из разметки
   * @param item - элемент из массива {_id: ID карточки, name: название, link: ссылка, likes: лайки, owner{} - данные о владельце карточки ({_id: ID владельца})}
   */
  constructor({item, currentUser, handleCardClick, handleDeleteCard, handleLikeCard}, cardTemplateSelector) {
    this._cardId = item._id; // сохраняем id карточки
    this._name = item.name; // сохраняем название карточки
    this._link = item.link; // сохраняем ссылку на изображение карточки
    this._likes = item.likes; // сохраняем список лайков карточки
    this._ownerId = item.owner._id; // сохраняем id владельца карточки
    this._cardElement = cardTemplateSelector; // сохраняем селектор шаблона карточки
    this._handleCardClick = handleCardClick; // сохраняем функцию для обработки клика на изображение
    this._handleDeleteCard = handleDeleteCard; // сохраняем функцию для обработки удаления карточки
    this._handleLikeCard = handleLikeCard; // сохраняем функцию для обработки лайков
    this._currentUser = currentUser; // сохраняем id текущего пользователя
  }

  /** 
   * Получает шаблон, клонирует его
   * @returns {Node} - элемент карточки
   * @private 
   */
  _getCardTemplate() {
    return document.querySelector(this._cardElement).content.querySelector('li').cloneNode(true); // находим шаблон карточки и клонируем его
  }

  /** 
   * Получает кол-во лайков фото, проверяет, поставил ли текущий пользователь лайк и делает активной кнопку лайка
   * @param likes - объект с лайками
   * @param mode - режим для хандлера лайка: setLike - добавляет класс, deleteLike - удаляет,
   *               если не задан, переходит к проверке, поставил ли текущий пользователь лайк (для рендера)
   */
  updateLikes(likes, mode) {
    likes.length !== 0
      ? this._cardLikeCounter.textContent = likes.length // если есть лайки, отображаем их количество
      : this._cardLikeCounter.textContent = '0'; // если лайков нет, отображаем 0

    mode === "setLike"
      ? this._cardLikeButton.classList.add('photo-card__like-button_active') // если режим "setLike", делаем кнопку лайка активной
      : "deleteLike"
        ? this._cardLikeButton.classList.remove('photo-card__like-button_active') // если режим "deleteLike", убираем активный класс с кнопки лайка
        : null;

    likes.some(user => user._id === this._currentUser) // если текущий пользователь поставил лайк, делаем кнопку активной
      ? this._cardLikeButton.classList.add('photo-card__like-button_active')
      : null;
  }

  /** 
   * Устанавливает прослушиватели: лайк, удаление, нажатие на изображение
   * если владелец карточки не является текущим пользователем, то прослушиватель на кнопку удаления не вешается
   * @private 
   */
  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => { // добавляем слушатель на кнопку лайка
      if (!this._cardLikeButton.classList.contains('photo-card__like-button_active')) {
        this._handleLikeCard.handleSetLike(this._cardId, this._cardItem); // если лайк не активен, ставим лайк
      } else {
        this._handleLikeCard.handleDeleteLike(this._cardId, this._cardItem); // если лайк активен, удаляем лайк
      }
    });
    if (this._ownerId === this._currentUser) { // если текущий пользователь является владельцем карточки
      this._cardDeleteButton.addEventListener('click', () => this._handleDeleteCard(this._cardId, this._cardItem)); // добавляем слушатель на кнопку удаления
    }
    this._cardImage.addEventListener('click', () => this._handleCardClick()); // добавляем слушатель на изображение
  }

  /** 
   * Удаляет элемент карточки, обнуляет экземпляр
   */
  deleteCard() {
    this._cardItem.remove(); // удаляем элемент карточки из DOM
    this._cardItem = null; // обнуляем экземпляр карточки
  }

  /** 
   * Создает карточку, заполняет название, ссылку на изображение, устанавливает прослушиватели
   * если владелец карточки не является текущим пользователем, то кнопка удаления не отображается
   * @returns {Node} - заполненный элемент карточки с установленными прослушивателями
   */
  createCard() {
    this._cardItem = this._getCardTemplate(); // получаем шаблон карточки
    this._cardImage = this._cardItem.querySelector('.photo-card__image'); // находим элемент изображения
    this._cardLikeButton = this._cardItem.querySelector('.photo-card__like-button'); // находим кнопку лайка
    this._cardLikeCounter = this._cardItem.querySelector('.photo-card__like-counter'); // находим счетчик лайков
    this._cardDeleteButton = this._cardItem.querySelector('.photo-card__delete'); // находим кнопку удаления
    this._cardItem.querySelector('.photo-card__title').textContent = this._name; // заполняем название карточки
    this._cardImage.src = this._link; // заполняем ссылку на изображение
    this._cardImage.alt = this._name; // заполняем alt для изображения
    if (this._ownerId !== this._currentUser) { // если текущий пользователь не является владельцем карточки
      this._cardDeleteButton.remove(); // удаляем кнопку удаления
    }
    this.updateLikes(this._likes, ""); // обновляем количество лайков
    this._setEventListeners(); // устанавливаем слушатели событий
    return this._cardItem; // возвращаем заполненную карточку
  }
}
