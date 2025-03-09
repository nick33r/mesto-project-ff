// функция открытия попапа с картинкой
// input: image - узел картинки
// input: configObject - объект с конфигом, должен содержать popup, image, caption
//     Пример конфига
// const imageOpenConfig = {
//   popup: imagePopup, (попап который будет открыт)
//   image: imagePopupPicture, (картинка в попапе)
//   caption: caption (подпись к картинке в попапе)
// };
// input: handleKeydownClose - функция закрытия попапа по нажатию Escape

function openImageModal (image, configObject, handleKeydownClose) {
  configObject.image.src = image.src;
  configObject.image.alt = image.alt;
  configObject.caption.textContent = image.alt;

  configObject.popup.classList.add('popup_is-opened');
  handleKeydownClose(configObject.popup);
};

export { openImageModal };