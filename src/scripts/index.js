import '../pages/index.css';

// ------------------ Импорт модулей js ------------------

import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {showError} from './components/error-notification.js';
import {
  // Получение данных
  getUserData,
  getCardsData,
  
  // Работа с профилем
  patchEditProfile,
  patchAvatar,
  
  // Работа с карточками
  postNewCard,
  deleteCardInDatabase,
  toggleLike
} from './components/api.js';

// ------------------ DOM узлы ------------------

// Контейнер с карточками
const placesList = document.querySelector('.places__list');
// Кнопки открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// Попапы
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const acceptDeletePopup = document.querySelector('.popup_type_delete');
// Массив попапов
const popups = document.querySelectorAll('.popup');
// Узлы для редактирования профиля
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
// Аватар профиля
const profileImage = document.querySelector('.profile__image');
// Узлы для открытия попапа с картинкой
const imagePopupPicture = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
// Узлы для добавления новой карточки
const imageNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');
// Узлы для редактирования аватара
const avatarPopupInput = document.querySelector('.popup__input_type_avatar-url');
// Узлы для удаления карточки
const acceptDeleteButton = document.querySelector('.popup__button_type_delete');
// Формы для обработки
const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place'];
const editAvatarForm = document.forms['edit-avatar'];
// Узлы для попапа с ошибкой
const errorPopup = document.querySelector('.error-popup');
const errorMessage = errorPopup.querySelector('.error-popup__message');

// ------------------ Переменные ------------------

// Переменные для обработчика удаления карточки
let idCardToDelete;
let cardToDelete;

// ------------------ Конфиги ------------------

// Конфиг для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
// Конфиг для API
const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: '025ba30a-6c57-44d8-9f11-68a718bec502',
    'Content-Type': 'application/json'
  }
};

// ------------------ Инициализация страницы ------------------

// Включаем валидацию форм

enableValidation(validationConfig);

// Получаем данные пользователя и карточек с сервера, отображаем их в профиле и рендерим карточки

Promise.all([getUserData(apiConfig), getCardsData(apiConfig)])
  .then (([userData, cardsData]) => {
    nameElement.textContent = userData.name;
    jobElement.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    cardsData.forEach(cardData => {
      const newCardElement = createCard(
        cardData,
        (event) => handleLike(newCardElement, event, cardData, apiConfig),
        () => handleDelete(newCardElement, cardData),
        handleImageOpener,
        userData
      );

      placesList.appendChild(newCardElement);
    });
  })
  .catch((err) => {
    const error = `Ошибка получения данных о прифиле/карточках.\n${err}`;  
    console.log(error);
    showError(error, errorPopup, errorMessage);
  })
;

// ------------------ Слушатели событий ------------------

// Добавляем слушатели открытий попапов

editButton.addEventListener('click', () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  clearValidation(editForm, validationConfig);
  openModal(editPopup);
});

addButton.addEventListener('click', () => {
  imageNameInput.value = '';
  linkInput.value = '';
  clearValidation(addForm, validationConfig);
  openModal(addPopup);
});

profileImage.addEventListener('click', () => {
  avatarPopupInput.value = '';
  clearValidation(editAvatarForm, validationConfig);
  openModal(editAvatarPopup);
});

// Добавляем слушатели закрытий попапов по клику

popups.forEach(popup => {
  const closeButton = popup.querySelector('.popup__close');
  popup.addEventListener('click', (event) => {
    if (event.target === closeButton || event.target === popup) {
      closeModal(popup);
    };
  });
});

// Добавляем обработку отправки формы редактирования профиля

editForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const submitButton = event.submitter;
  submitButton.disabled = true;
  submitButton.textContent = 'Сохранение...';

  patchEditProfile(apiConfig, nameInput, jobInput)
    .then(() => {
      const newName = nameInput.value;
      const newJob = jobInput.value;

      nameElement.textContent = newName;
      jobElement.textContent = newJob;

      closeModal(editPopup);
    })
    .catch((err) => {
      const error = `Ошибка редактирования профиля.\n${err}`;
      console.log(error);
      showError(error, errorPopup, errorMessage);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
});

// Добавляем обработку отправки формы добавления новой карточки

addForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const submitButton = event.submitter;
  submitButton.disabled = true;
  submitButton.textContent = 'Сохранение...';

  postNewCard(apiConfig, imageNameInput, linkInput)
    .then((cardData) => {
      const newCardElement = createCard(
        cardData,
        (event) => handleLike(newCardElement, event, cardData, apiConfig),
        () => handleDelete(newCardElement ,cardData),
        handleImageOpener
      );

      placesList.prepend(newCardElement);
      closeModal(addPopup);
      imageNameInput.value = '';
      linkInput.value = '';
    })
    .catch((err) => {
      const error = `Ошибка добавления карточки.\n${err}`;
      console.log(error);
      showError(error, errorPopup, errorMessage);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
});

// Добавляем обработку отправки формы редактирования аватара

editAvatarForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const submitButton = event.submitter;
  submitButton.disabled = true;
  submitButton.textContent = 'Сохранение...';

  patchAvatar(apiConfig, avatarPopupInput)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(editAvatarPopup);
      avatarPopupInput.value = '';
    })
    .catch((err) => {
      const error = `Ошибка изменения аватара.\n${err}`;
      console.log(error);
      showError(error, errorPopup, errorMessage);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
});

// Добавляем обработку удаления карточки

acceptDeleteButton.addEventListener('click', () => {
  acceptDeleteButton.disabled = true;
  acceptDeleteButton.textContent = 'Удаление...';

  deleteCardInDatabase(apiConfig, idCardToDelete)
        .then(() => {
          deleteCard(cardToDelete);
          closeModal(acceptDeletePopup);
        })
        .catch((err) => {
          const error = `Ошибка удаления карточки.\n${err}`;
          console.log(error);
          showError(error, errorPopup, errorMessage);
        })
        .finally(() => {
          acceptDeleteButton.textContent = 'Да';
          acceptDeleteButton.disabled = false;
        });
});

// ------------------ Функции ------------------

// Функция открытия картинки

function handleImageOpener (name, link) {
  imagePopupPicture.src = link;
  imagePopupPicture.alt = name;
  caption.textContent = name;

  openModal(imagePopup);
};

// Функция обработки лайка с отправкой запроса к серверу

function handleLike (cardElement, event, cardData, apiConfig) {
  const likeButton = event.target;
  const cardLikes = cardElement.querySelector('.card__likes');
  
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const method = isLiked ? 'DELETE' : 'PUT';

  likeButton.disabled = true;

  toggleLike(apiConfig, cardData['_id'], method)
    .then((data) => {
      cardLikes.textContent = `${data.likes.length}`;
      likeCard(likeButton);
    })
    .catch((err) => {
      const error = `Ошибка лайка карточки.\n${err}`;
      console.log(error);
      showError(error, errorPopup, errorMessage);
    })
    .finally(() => {
      likeButton.disabled = false;
    });
};

// Функция обработки удаления

function handleDelete (cardElement, cardData) {
  idCardToDelete = cardData['_id'];
  cardToDelete = cardElement;
  openModal(acceptDeletePopup);
};
