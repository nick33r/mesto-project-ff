// Функция создания карточки
// input: card - объект карточки (должен содержать свойства name и link)
// input: handleDelete - функция удаления карточки
// input: handleLike - функция добавления/снятия лайка
// input: handleOpenImage - функция открытия картинки по клику
// output: DOM-узел новой карточки

function createCard(card, handleLike, handleDelete, handleOpenImage, isLiked = false, isOwner = true) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeButton = cardItem.querySelector('.card__like-button');

  cardItem.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener('click', () => {
    handleOpenImage(card.name, card.link);
  });

  if (!isOwner) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener('click', handleDelete);
  }

  cardLikeButton.addEventListener('click', handleLike);
  
  likeCard(cardLikeButton, isLiked);
  
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

export { createCard, deleteCard, likeCard };