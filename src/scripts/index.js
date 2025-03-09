import '../pages/index.css';

// Импорт модулей js

import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal, closeOnEscape, removeKeydownListeners} from './components/modal.js';

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
// Узлы для добавления новой карточки (функция formAddCardSubmit)
const popupImage = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
const imageNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

// ------------------ Инициализация страницы ------------------

// Вывести дефолтные карточки на страницу при загрузке

initialCards.forEach(card => {
  placesList.appendChild(createCard(card, deleteCard, likeCard));
});

// Добавляем открытие и закрытие(по клику) попапов

editButton.addEventListener('click', () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  openModal(editPopup, closeOnEscape);
});

addButton.addEventListener('click', () => {
  openModal(addPopup, closeOnEscape);
});

popups.forEach(popup => {
  const closeButton = popup.querySelector('.popup__close');
  closeModal(popup, closeButton);
});

// Добавляем открытие попапа с картинкой

const images = document.querySelectorAll('.card__image');

images.forEach(image => {
  image.addEventListener('click', () => {
    openImageModal(image, imagePopup, closeOnEscape);
  });
});

function openImageModal (image, modal, handleKeydownClose) {
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  caption.textContent = image.alt;

  modal.classList.add('popup_is-opened');
  handleKeydownClose(modal);
};

// Добавляем обработку отправки форм

editPopup.addEventListener('submit', formEditSubmit);
addPopup.addEventListener('submit', formAddCardSubmit);

// Функции обработки отправки форм

function formEditSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;
  
  nameElement.textContent = name;
  jobElement.textContent = job;

  editPopup.classList.remove('popup_is-opened');
  removeKeydownListeners();
};

function formAddCardSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: imageNameInput.value,
    link: linkInput.value
  };
  
  const newCardElement = createCard(newCard, deleteCard, likeCard);
  placesList.prepend(newCardElement);

  const newImage = newCardElement.querySelector('.card__image');
  newImage.addEventListener('click', () => {
    openImageModal(newImage, imagePopup, closeOnEscape);
  });

  imageNameInput.value = '';
  linkInput.value = '';

  addPopup.classList.remove('popup_is-opened');
  removeKeydownListeners();
};

export { placesList };