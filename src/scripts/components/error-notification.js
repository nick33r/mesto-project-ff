let hideTimeout;

// Функция показа уведомления об ошибке

function showError(message, errorPopup, errorPopupMessage) {
  clearTimeout(hideTimeout);
  
  errorPopupMessage.textContent = message;
  
  errorPopup.classList.add('error-popup_visible');
  
  hideTimeout = setTimeout(() => {
    hideError(errorPopup);
  }, 4000);
}

// Функция скрытия уведомления ошибки

function hideError(errorPopup) {
  errorPopup.classList.remove('error-popup_visible');
};

export { showError };