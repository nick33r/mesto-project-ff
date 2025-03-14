// Функция открытия модального окна
// input: modal - DOM-узел модального окна

function openModal (modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
};

// Функция закрытия модального окна по клику
// input: modal - DOM-узел модального окна

function closeModal (modal) {
  modal.classList.remove('popup_is-opened');
  removeKeydownListeners();
};

// Функция закрытия модального окна по нажатию Escape
// input: event - событие нажатия Escape

function closeByEscape (event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  };
};

// Функция удаления обработчиков нажатия Escape

function removeKeydownListeners () {
  document.removeEventListener('keydown', closeByEscape);
};

export { openModal, closeModal };