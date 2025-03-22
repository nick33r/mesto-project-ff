import '../pages/index.css';

// Импорт модулей js

import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {enableValidation} from './components/validation.js';

// Импорт данных (дефолтные карточки при загрузке страницы)

import {initialCards} from './cards.js';

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
// Массив попапов
const popups = document.querySelectorAll('.popup');
// Узлы для редактирования профиля
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
// Узлы для открытия попапа с картинкой
const imagePopupPicture = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
// Узлы для добавления новой карточки
const imageNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');
// Формы для обработки
const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place']; 


// ------------------ Инициализация страницы ------------------

// Вывести дефолтные карточки на страницу при загрузке

initialCards.forEach(card => {
  placesList.appendChild(createCard(card, deleteCard, likeCard, openImagePopup));
});

// ------------------ Слушатели событий ------------------

// Добавляем слушатели открытий попапов

editButton.addEventListener('click', () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  openModal(editPopup);
});

addButton.addEventListener('click', () => {
  imageNameInput.value = '';
  linkInput.value = '';
  openModal(addPopup);
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

  const newName = nameInput.value;
  const newJob = jobInput.value;

  nameElement.textContent = newName;
  jobElement.textContent = newJob;

  closeModal(editPopup);
});

// Добавляем обработку отправки формы добавления новой карточки

addForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newCard = {
    name: imageNameInput.value,
    link: linkInput.value
  };

  const newCardElement = createCard(newCard, deleteCard, likeCard, openImagePopup);
  placesList.prepend(newCardElement);

  imageNameInput.value = '';
  linkInput.value = '';

  closeModal(addPopup);
});

// Функция открытия картинки

function openImagePopup (name, link) {
  imagePopupPicture.src = link;
  imagePopupPicture.alt = name;
  caption.textContent = name;

  openModal(imagePopup);
};

// TEST !!!!!

nameInput.value = nameElement.textContent;
jobInput.value = jobElement.textContent;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);