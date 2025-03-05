// DOM узлы

const placesList = document.querySelector('.places__list');

// Функция создания карточки
// input: card - объект карточки
// input: handleDelete - функция удаления карточки
// input: handleLike - функция добавления/снятия лайка

function createCard(card, handleDelete, handleLike) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button');

  cardItem.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  placesList.appendChild(cardItem);

  deleteButton.addEventListener('click', () => {
    handleDelete(cardItem);
  });

  likeButton.addEventListener('click', () => {
    handleLike(likeButton);
  });
};

// Функция удаления карточки

function deleteCard(itemToDelete) {
  itemToDelete.remove();
};

// Функция добавления/снятия лайка

function likeCard(itemToLike) {
  itemToLike.classList.toggle('card__like-button_is-active');
};

export { createCard, deleteCard, likeCard };