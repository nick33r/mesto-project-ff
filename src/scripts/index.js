import '../pages/index.css';

// Импорт модулей js

import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal, closeOnEscape, removeKeydownListeners} from './components/modal.js';
import {formEditSubmit, formAddCardSubmit} from './components/form-submit.js';
import {openImageModal} from './components/image.js';

// Импорт данных (дефолтные карточки при загрузке страницы)

import {initialCards} from './cards.js';

// ------------------ DOM узлы ------------------

// Контейнер с карточками
const placesList = document.querySelector('.places__list');
// Кнопки открытия попапов и сами попапы
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
// Массив попапов
const popups = document.querySelectorAll('.popup');
// Узлы для редактирования профиля (функция formEditSubmit)
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
// Узлы для попапа с картинкой
const imagePopupPicture = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
// Узлы для добавления новой карточки (функция formAddCardSubmit)
const imageNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

// Конфиг для открытия попапа с картинкой (функция openImageModal)

const imageOpenConfig = {
  popup: imagePopup,
  image: imagePopupPicture,
  caption: caption
};

// Конфиг для редактирования профиля (функция formEditSubmit)

const profileEditConfig = {
  newName: nameInput,
  newJob: jobInput,
  name: nameElement,
  job: jobElement
};

// ------------------ Инициализация страницы ------------------

// Вывести дефолтные карточки на страницу при загрузке

initialCards.forEach(card => {
  placesList.appendChild(createCard(card, deleteCard, likeCard));
});

// ------------------ Слушатели событий ------------------

// Добавляем слушатели открытий попапов и закрытия(по клику)

editButton.addEventListener('click', () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  openModal(editPopup, closeOnEscape);
});

addButton.addEventListener('click', () => {
  imageNameInput.value = '';
  linkInput.value = '';
  openModal(addPopup, closeOnEscape);
});

popups.forEach(popup => {
  const closeButton = popup.querySelector('.popup__close');
  closeModal(popup, closeButton);
});

// Добавляем слушатели открытия попапа с картинкой на все изображения

const images = document.querySelectorAll('.card__image');

images.forEach(image => {
  image.addEventListener('click', () => {
    openImageModal(image, imageOpenConfig, closeOnEscape);
  });
});

// Добавляем обработку отправки формы редактирования профиля

editPopup.addEventListener('submit', (event) => {
  formEditSubmit(event, profileEditConfig);

  editPopup.classList.remove('popup_is-opened');
  removeKeydownListeners();
});

// Добавляем обработку отправки формы добавления новой карточки

addPopup.addEventListener('submit', (event) => {
  const newCardElement = formAddCardSubmit(event, imageNameInput, linkInput);
  placesList.prepend(newCardElement);

  const newImage = newCardElement.querySelector('.card__image');
  newImage.addEventListener('click', () => {
    openImageModal(newImage, imageOpenConfig, closeOnEscape);
  });

  addPopup.classList.remove('popup_is-opened');
  removeKeydownListeners();
});