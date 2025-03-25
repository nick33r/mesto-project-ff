// Функция создания карточки
// input: card - объект карточки (должен содержать свойства name и link)
// input: handleDelete - функция удаления карточки
// input: handleLike - функция добавления/снятия лайка
// input: handleOpenImage - функция открытия картинки по клику
// output: DOM-узел новой карточки

function createCard(cardData, handleLike, handleDelete, handleOpenImage, userData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeButton = cardItem.querySelector('.card__like-button');
  const cardLikes = cardItem.querySelector('.card__likes');

  cardItem.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener('click', () => {
    handleOpenImage(cardData.name, cardData.link);
  });

  cardLikeButton.addEventListener('click', handleLike);

  if (userData) {
    isOwnerStatusCheck(cardData, userData) ? cardDeleteButton.addEventListener('click', handleDelete) : cardDeleteButton.remove();
    isLikedStatusCheck(cardData, userData) ? likeCard(cardLikeButton, true) : likeCard(cardLikeButton, false);
  } else {
    cardDeleteButton.addEventListener('click', handleDelete);
  };

  if (cardData.likes) {
    cardLikes.textContent = `${cardData.likes.length}`;
  };
  
  return cardItem;
};

// Функция удаления карточки
// input: itemToDelete - DOM-узел карточки

function deleteCard(itemToDelete) {
  itemToDelete.remove();
};

// Функция добавления/снятия лайка
// input: itemToLike - DOM элемент кнопки лайка

function likeCard(itemToLike, chekStatus) {
  itemToLike.classList.toggle('card__like-button_is-active', chekStatus);
};

// Функция проверки статуса лайка пользователем

function isLikedStatusCheck (cardData, userData) {
  return cardData.likes.some(like => like['_id'] === userData['_id']);
};

// Функция проверки создателя карточки относительно текущего пользователя

function isOwnerStatusCheck (cardData, userData) {
  return cardData.owner['_id'] === userData['_id'];
};

export { createCard, deleteCard, likeCard };