import '../pages/index.css';

// ------------------ Импорт модулей js ------------------

import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
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
// Формы для обработки
const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place'];
const editAvatarForm = document.forms['edit-avatar'];

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
  },
  userId: ''
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

    apiConfig.userId = userData['_id'];

    return cardsData;
  })
  .then((cardsData) => {
    cardsData.forEach(card => {
      const newCardElement = createCard(card, openImagePopup);
      const likeButton = newCardElement.querySelector('.card__like-button');
      const cardLikes = newCardElement.querySelector('.card__likes');

      placesList.appendChild(newCardElement);
      cardLikes.textContent = `${card.likes.length}`;

      if (card.likes.length > 0) {
        const isLiked = card.likes.some(like => like['_id'] === apiConfig.userId);

        if (isLiked) {
          likeCard(likeButton);
        }
      };

      setupCardInteractions(card, newCardElement, apiConfig);
    });
  })
  .catch((err) => {
    console.log(err);
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
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      closeModal(editPopup);
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
    .then((newCard) => {
      const newCardElement = createCard(newCard, openImagePopup);
      setupCardInteractions(newCard, newCardElement, apiConfig);
      placesList.prepend(newCardElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      imageNameInput.value = '';
      linkInput.value = '';
      submitButton.textContent = 'Сохранить';
      closeModal(addPopup);
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
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopupInput.value = '';
      submitButton.textContent = 'Сохранить';
      closeModal(editAvatarPopup);
      submitButton.disabled = false;
    });
});

// ------------------ Функции ------------------

// Функция открытия картинки

function openImagePopup (name, link) {
  imagePopupPicture.src = link;
  imagePopupPicture.alt = name;
  caption.textContent = name;

  openModal(imagePopup);
};

// функция добавления слушателей к карточке с запросами на сервер

function setupCardInteractions (cardData, newCardElement, apiConfig) {
  const deleteButton = newCardElement.querySelector('.card__delete-button');
  const likeButton = newCardElement.querySelector('.card__like-button');
  const cardLikes = newCardElement.querySelector('.card__likes');

  likeButton.addEventListener('click', () => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const method = isLiked ? 'DELETE' : 'PUT';

    const previousLikes = parseInt(cardLikes.textContent);
    cardLikes.textContent = isLiked ? previousLikes - 1 : previousLikes + 1;

    const previousButtonState = isLiked;
    likeCard(likeButton);

    likeButton.disabled = true;

    toggleLike(apiConfig, cardData['_id'], method)
      .then((data) => {
        cardLikes.textContent = `${data.likes.length}`;
      })
      .catch((err) => {
        console.log(err);
        likeCard(likeButton, previousButtonState);
        cardLikes.textContent = previousLikes;
      })
      .finally(() => {
        likeButton.disabled = false;
      });
  });
  
  if (cardData.owner['_id'] === apiConfig.userId) {
    deleteButton.addEventListener('click', () => {
      deleteCardInDatabase(apiConfig, cardData['_id'])
        .then(() => {
          deleteCard(newCardElement);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    deleteButton.remove();
  }
};