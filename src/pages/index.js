'use strict';  // Включение строгого режима JavaScript для предотвращения ошибок

import './index.css';  // Импорт стилей для текущего модуля
import {apiSettings, validationSettings} from "../utils/const.js";  /** Настройки API и валидации */
import {Card} from "../components/Card.js";  // Импорт класса для создания карточек
import {FormValidator} from "../components/FormValidator.js";  // Импорт валидатора форм
import {Section} from '../components/Section.js'  // Импорт класса для работы с секциями
import {PopupWithForm} from '../components/PopupWithForm.js';  // Импорт класса для всплывающих окон с формами
import {PopupWithImage} from '../components/PopupWithImage.js';  // Импорт класса для всплывающих окон с изображениями
import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js';  // Импорт класса для всплывающих окон с подтверждением
import {UserInfo} from '../components/UserInfo.js';  // Импорт класса для работы с данными пользователя
import {Api} from '../components/Api';  // Импорт класса для взаимодействия с API

/** Экземпляр API
 * @type {Api} */
const api = new Api(apiSettings);  // Создание экземпляра API с переданными настройками

/** ID залогиненного пользователя
 * @type {string} */
let currentUser = '';  // Переменная для хранения ID текущего пользователя

/** Параллельное получение данных пользователя и массива карточек */
Promise.all([api.getUserInfo(), api.getCards()])  // Ожидаем выполнения двух асинхронных операций: получения данных пользователя и карточек
  .then((res) => {  // Обрабатываем результат выполнения операций
    currentUser = res[0]._id;  // Сохраняем ID пользователя
    console.log('ID пользователя:', currentUser);  // Выводим ID в консоль
    /** Из результата 1 промиса получаем ИД пользователя, и данные профиля */
    profile.setUserInfo(res[0]);  // Устанавливаем информацию о пользователе
    sectionPhotoCards.renderElements(res[1]);  /** из результата второго - карточки */
  })
  .catch((err) => {  // Обрабатываем ошибку, если одна из операций не выполнится
    console.log(err);
  });
/** Создает новую секцию для галереи @type {Section} */
const sectionPhotoCards = new Section({
  renderer: (item) => {  // Метод рендеринга карточек
    sectionPhotoCards.addItem(copyCard(item, currentUser))  // Добавляем новую карточку в секцию
  }
}, '.photo-cards');  // Селектор секции, в которую будут добавляться карточки

/** Профиль пользователя */

/** Форма редактирования профиля
 * @type {Element} */
const formProfileEdit = document.querySelector(".popup_edit_profile " + validationSettings.formSelector);  // Получаем форму редактирования профиля

/** Форма редактирования аватара
 * @type {Element} */
const formAvatarEdit = document.querySelector(".popup_update-avatar " + validationSettings.formSelector);  // Получаем форму редактирования аватара

/** Экземпляр валидатора для формы редактирования профиля
 * @type {FormValidator} */
const profileEditValidator = new FormValidator(validationSettings, formProfileEdit);  // Создание валидатора для формы редактирования профиля

/** Экземпляр валидатора для формы редактирования аватара
 * @type {FormValidator} */
const avatarEditValidator = new FormValidator(validationSettings, formAvatarEdit);  // Создание валидатора для формы редактирования аватара

/** Всплывашка редактирования профиля */
/** @type {HTMLElement} */
const profileEditPopup = document.querySelector(".popup_edit_profile");  // Получаем всплывающее окно редактирования профиля

/** Имя пользователя в всплывашке редактирования профиля */
/** @type {HTMLInputElement} */
const popupTitleInput = profileEditPopup.querySelector('#profile_name');  // Получаем поле ввода имени пользователя

/** Подпись пользователя в всплывашке редактирования профиля */
/** @type {HTMLInputElement} */
const popupAboutInput = profileEditPopup.querySelector('#profile_about');  // Получаем поле ввода подписи пользователя

/** Кнопка редактирования профиля */
/** @type {HTMLElement} */
const profileEditButton = document.querySelector(".profile__button");  // Получаем кнопку редактирования профиля

/** Экземпляр профиля пользователя */
const profile = new UserInfo(
  {
    profileTitle: ".profile__title",
    profileAbout: ".profile__about",
    profileAvatar: ".profile__avatar"
  }
);  // Создание экземпляра профиля пользователя с указанием селекторов для элементов на странице

/** Экземпляр формы редактирования профиля */
const profileForm = new PopupWithForm(
  ".popup_edit_profile",
  {
    handleSubmitForm: (inputValues) => {  // Обработчик отправки формы редактирования профиля
      api.sendUserInfo(inputValues)  // Отправляем данные на сервер
        .then((data) => {  // Обрабатываем успешный ответ
          profile.setUserInfo(
            {name: data.name, about: data.about, avatar: data.avatar}  // Обновляем информацию о пользователе
          );
          profileForm.close();  // Закрываем форму
        })
        .catch((err) => {  // Обрабатываем ошибку
          console.log(err);
        })
        .finally(() => {  // Завершаем процесс с индикацией загрузки
          profileForm.renderLoading(false);
        })
    }
  });

/** Присваивает инпутам в форме редактирования профиля значения
 * @param info объект значений {title: title, about: about} */
const setProfileInputs = (info) => {
  popupTitleInput.value = info.title;  // Устанавливаем имя в поле ввода
  popupAboutInput.value = info.about;  // Устанавливаем подпись в поле ввода
};

const avatarEditButton = document.querySelector(".profile__edit-avatar-button");  // Получаем кнопку редактирования аватара

avatarEditButton.addEventListener('click', () => {  // Добавляем обработчик на клик по кнопке редактирования аватара
  avatarForm.open();  // Открываем форму редактирования аватара
  avatarEditValidator.validateInputs();  // Проверяем правильность ввода данных
  avatarEditValidator.switchSubmitButton();  // Управляем состоянием кнопки отправки формы
})

/** Экземпляр формы редактирования аватара */
const avatarForm = new PopupWithForm(
  ".popup_update-avatar",
  {
    handleSubmitForm: (inputValues) => {  // Обработчик отправки формы редактирования аватара
      api.updateAvatar(inputValues.avatar)  // Отправляем новый аватар на сервер
        .then((res) => {  // Обрабатываем успешный ответ
          profile.setUserInfo({avatar: res.avatar, name: res.name, about: res.about});  // Обновляем информацию о пользователе
          avatarForm.close();  // Закрываем форму
        })
        .catch((err) => {  // Обрабатываем ошибку
          console.log(err);
        })
        .finally(() => {  // Завершаем процесс с индикацией загрузки
          avatarForm.renderLoading(false);
        })
    }
  })

/** Карточки изображений */

/** Форма добавления карточки
 * @type {Element} */
const formNewPlace = document.querySelector(".popup_new-place " + validationSettings.formSelector);  // Получаем форму добавления карточки

/** Экземпляр валидатора для формы добавления карточки
 * @type {FormValidator} */
const newPlaceValidator = new FormValidator(validationSettings, formNewPlace);  // Создание валидатора для формы добавления карточки

/** Экземпляр всплывашки просмотра изображения */
const popupImage = new PopupWithImage('.popup_view_image');  // Создание экземпляра для всплывающего окна просмотра изображения

/** Экземпляр всплывашки подтверждения удаления карточки */
const popupImageDelete = new PopupWithConfirmation(
  '.popup_delete-place',
  {
    handleSubmitDelete: (id, element) => {  // Обработчик удаления карточки
      api.deleteCard(id)  // Удаляем карточку с сервера
        .then(() => {  // Обрабатываем успешный ответ
          element.deleteCard();  // Удаляем карточку из интерфейса
          popupImageDelete.close();  // Закрываем всплывающее окно подтверждения
        })
        .catch((err) => {  // Обрабатываем ошибку
          console.log(err);
        });
    }
  }
);

/** Кнопка Добавить место */
/** @type {HTMLButtonElement} */
const buttonAddPlace = document.querySelector(".profile__add-button");  // Получаем кнопку добавления нового места

/** Создает экземпляры карточек
 * @param item - элемент карточки {name, link}
 * @param currentUser
 * @returns {Node} - готовый узел карточки с прослушивателями */
const copyCard = (item, currentUser) => {  // Функция для создания карточки
  const card = new Card({
      item, currentUser,
      handleCardClick: () => {  // Обработчик клика по карточке
        popupImage.open({title: item.name, src: item.link});  // Открываем попап с изображением
      },
      handleDeleteCard: (id, element) => {  // Обработчик удаления карточки
        popupImageDelete.open(card);  // Открываем попап с подтверждением удаления
        popupImageDelete.getCard(id, element)  // Передаем информацию о карточке
      },
      handleLikeCard: {
        handleSetLike: (id) => {  // Обработчик постановки лайка
          api.setLike(id)  // Отправляем запрос на установку лайка
            .then((res) => {  // Обрабатываем успешный ответ
              card.updateLikes(res.likes, "setLike");  // Обновляем количество лайков на карточке
            })
            .catch((err) => {  // Обрабатываем ошибку
              console.log(err);
            })
        },
        handleDeleteLike: (id) => {  // Обработчик удаления лайка
          api.deleteLike(id)  // Отправляем запрос на удаление лайка
            .then((res) => {  // Обрабатываем успешный ответ
              card.updateLikes(res.likes, "deleteLike");  // Обновляем количество лайков на карточке
            })
            .catch((err) => {  // Обрабатываем ошибку
              console.log(err);
            })

        }
      }
    },
    "#photo-card");  // Шаблон карточки
  return card.createCard();  // Возвращаем готовую карточку
}

/** Экземпляр формы добавления карточки */
const addPhotoForm = new PopupWithForm(
  ".popup_new-place",
  {
    handleSubmitForm: (inputValues) => {  // Обработчик отправки формы добавления карточки
      api.sendCard(inputValues)  // Отправляем данные карточки на сервер
        .then((data) => {  // Обрабатываем успешный ответ
          sectionPhotoCards.addNewItem(copyCard(data, currentUser));  // Добавляем новую карточку в секцию
          addPhotoForm.close();  // Закрываем форму
        })
        .finally(() => {  // Завершаем процесс с индикацией загрузки
          addPhotoForm.renderLoading(false);
        })
    }
  });


/** Прослушиватель нажатия на кнопку редактирования профиля */
profileEditButton.addEventListener('click', function () {  // Обработчик клика по кнопке редактирования профиля
  setProfileInputs(profile.getUserInfo());  // Заполняем поля формы текущими данными пользователя
  profileForm.open();  // Открываем форму редактирования профиля
  profileEditValidator.validateInputs();  // Проверяем правильность ввода данных
  profileEditValidator.switchSubmitButton();  // Управляем состоянием кнопки отправки формы
})

/** Прослушиватель нажатия на кнопку Добавить место */
buttonAddPlace.addEventListener('click', function () {  // Обработчик клика по кнопке добавления нового места
  addPhotoForm.open();  // Открываем форму добавления карточки
  newPlaceValidator.validateInputs();  // Проверяем правильность ввода данных
  /** Возможно, лишнее, но зато сразу понятно, какие поля не заполнены */
  newPlaceValidator.switchSubmitButton();  // Управляем состоянием кнопки отправки формы
})

/** Ждем загрузки DOM */
document.addEventListener('DOMContentLoaded', function () {  // Прослушиваем событие загрузки DOM

  /** Включает валидацию */
  profileEditValidator.enableValidation();  // Включаем валидацию для формы редактирования профиля
  newPlaceValidator.enableValidation();  // Включаем валидацию для формы добавления карточки
  avatarEditValidator.enableValidation()  // Включаем валидацию для формы редактирования аватара

  /** Вешает прослушиватели всплывашки изображения */
  popupImage.setEventListeners();  // Устанавливаем обработчики событий для попапа с изображением

  /** Вешает прослушиватели всплывашки редактирования профиля */
  profileForm.setEventListeners();  // Устанавливаем обработчики событий для попапа редактирования профиля

  /** Вешает прослушиватели всплывашки удаления карточки */
  popupImageDelete.setEventListeners();  // Устанавливаем обработчики событий для попапа с подтверждением удаления карточки

  /** Вешает прослушиватели всплывашки добавления карточки */
  addPhotoForm.setEventListeners();  // Устанавливаем обработчики событий для попапа добавления карточки

  /** Вешает прослушиватели всплывашки редактирования аватара */
  avatarForm.setEventListeners();  // Устанавливаем обработчики событий для попапа редактирования аватара
});
