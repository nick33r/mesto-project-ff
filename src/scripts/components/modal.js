import { initialCards } from '../cards.js';
import { createCard, deleteCard, likeCard } from './card.js';

// Функция открытия модального окна
// input: openButton - кнопка открытия модального окна
// input: modal - модальное окно
// input: handleClose - функция закрытия модального окна
// input: handleFormSubmitEvent - функция обработки отправки формы

function openModal (openButton ,modal, handleClose, handleFormSubmitEvent) {
  const closeButton = modal.querySelector('.popup__close');

  openButton.addEventListener('click', () => {
    modal.classList.add('popup_is-opened');
    handleClose(closeButton, modal);
  });

  if (handleFormSubmitEvent) {
    const formElement = modal.querySelector('.popup__form');
    formElement.addEventListener('submit', handleFormSubmitEvent);
    formElement.addEventListener('submit', () => {
      modal.classList.remove('popup_is-opened');
      removeEventListeners();
    });
  };
};

// Функция открытия модального окна с картинкой
// input: image - картинка
// input: modal - модальное окно
// input: handleClose - функция закрытия модального окна

function openImageModal (image, modal, handleClose) {
  const closeButton = modal.querySelector('.popup__close');
  const imageElement = modal.querySelector('.popup__image');
  const caption = modal.querySelector('.popup__caption');

  image.addEventListener('click', () => {
    imageElement.src = image.src;
    imageElement.alt = image.alt;
    caption.textContent = image.alt;

    modal.classList.add('popup_is-opened');
    handleClose(closeButton, modal);
  });
};

// Функция закрытия модального окна
// закрытие по клику на оверлей, по нажатию ESC и по нажатию на кнопку закрытия
// input: closeButton - кнопка закрытия модального окна
// input: modal - модальное окно

// Вывод функции удаления обработчиков в глобальную область видимости
let removeEventListeners;

function closeModal (closeButton, modal) {
  modal.addEventListener('click', eventClick);
  document.addEventListener('keydown', eventKey);

  removeEventListeners = () => {
    modal.removeEventListener('click', eventClick);
    document.removeEventListener('keydown', eventKey);
  };

  function eventClick (event) {
    if (event.target === closeButton || event.target === modal) {
      modal.classList.remove('popup_is-opened');
      removeEventListeners();
    };
  }
  function eventKey (event) {
    if (event.key === 'Escape') {
      modal.classList.remove('popup_is-opened');
      removeEventListeners();
    }; 
  };
};

// Обработчик редактирования профиля после отправки формы

// Находим элементы, куда должны быть вставлены значения полей
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__description');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
// Устанавливаем значиения полей формы по умолчанию
nameInput.value = nameElement.textContent;
jobInput.value = jobElement.textContent;

function formEditSubmit(evt) {
  evt.preventDefault();

  // Получите значение полей jobInput и nameInput из свойства value
  const name = nameInput.value;
  const job = jobInput.value;
  
  // Вставьте новые значения с помощью textContent
  nameElement.textContent = name;
  jobElement.textContent = job;
};

// Обработчик добавления новой карточки после отправки формы

function formAddCardSubmit(evt) {
  evt.preventDefault();
  // 1. Добавляем новый объект в начало массива initialCards
  const nameInput = document.querySelector('.popup__input_type_card-name');
  const linkInput = document.querySelector('.popup__input_type_url');
  const name = nameInput.value;
  const link = linkInput.value;

  initialCards.unshift({
    name: name,
    link: link
  });

  // 2. Удаляем все старые карточки в placesList
  const placesList = document.querySelectorAll('.places__list .places__item');
  placesList.forEach(deleteCard);
  // 3. Создаем новые карточки на основе обновленного массива
  initialCards.forEach(card => createCard(card, deleteCard, likeCard));

  // 4. Добавляем обработчик нажатия на картинку
  const imageList = document.querySelectorAll('.card__image');
  const imagePopup = document.querySelector('.popup_type_image');
  imageList.forEach(image => openImageModal(image, imagePopup, closeModal));

  // 5. Очищаем форму
  nameInput.value = '';
  linkInput.value = '';
};

export { openModal, openImageModal, closeModal, formEditSubmit, formAddCardSubmit };