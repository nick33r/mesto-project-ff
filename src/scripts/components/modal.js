// Функция открытия модального окна
// input: modal - DOM-узел модального окна
// input: handleKeydownClose - функция закрытия модального окна по нажатию Escape

function openModal (modal, handleKeydownClose) {
  modal.classList.add('popup_is-opened');
  handleKeydownClose(modal);
};

// Функция закрытия модального окна по клику
// input: modal - DOM-узел модального окна
// input: closeButton - DOM-узел кнопки закрытия

function closeModal (modal, closeButton) {
  modal.addEventListener('click', (event) => {
    if (event.target === closeButton || event.target === modal) {
      modal.classList.remove('popup_is-opened');
      removeKeydownListeners();
    };
  });
};

// Функция закрытия модального окна по нажатию Escape
// input: modal - DOM-узел модального окна

function closeOnEscape (modal) {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modal.classList.remove('popup_is-opened');
      removeKeydownListeners();
    }; 
  });
};

// Функция удаления обработчиков нажатия Escape

function removeKeydownListeners () {
  document.removeEventListener('keydown', closeOnEscape);
};

export { openModal, closeModal, closeOnEscape, removeKeydownListeners };