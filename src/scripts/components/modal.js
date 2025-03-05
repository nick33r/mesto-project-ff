// Функция открытия модального окна
// input: openButton - кнопка открытия модального окна
// input: modal - модальное окно
// input: handleClose - функция закрытия модального окна

function openModal (openButton ,modal, handleClose) {
  const closeButton = modal.querySelector('.popup__close');

  openButton.addEventListener('click', () => {
    modal.classList.add('popup_is-opened');
    handleClose(closeButton, modal);
  });
};

// Функция закрытия модального окна
// закрытие по клику на оверлей, по нажатию ESC и по нажатию на кнопку закрытия
// input: closeButton - кнопка закрытия модального окна
// input: modal - модальное окно

function closeModal (closeButton, modal) {
  modal.addEventListener('click', eventClick);
  document.addEventListener('keydown', eventKey);

  function eventClick (event) {
    if (event.target === closeButton || event.target === modal) {
      modal.classList.remove('popup_is-opened');

      document.removeEventListener('keydown', eventKey);
    };
  }
  function eventKey (event) {
    if (event.key === 'Escape') {
      modal.classList.remove('popup_is-opened');

      document.removeEventListener('keydown', eventKey);
    }; 
  };
};

export { openModal, closeModal };