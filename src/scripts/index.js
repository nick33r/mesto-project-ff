// Импорт модулей js

import {createCard, deleteCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';

// Импорт данных (дефолтные карточки при загрузке страницы)

import {initialCards} from './cards.js';

// Вывести дефолтные карточки на страницу при загрузке

initialCards.forEach(card => createCard(card, deleteCard));
import '../pages/index.css';

// Работа модальных окон

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');

openModal(editButton, editPopup, closeModal);
openModal(addButton, addPopup, closeModal);