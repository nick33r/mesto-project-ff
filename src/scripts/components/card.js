// Функция создания карточки
// input: card - объект карточки (должен содержать свойства name и link)
// input: handleDelete - функция удаления карточки
// input: handleLike - функция добавления/снятия лайка
// input: handleOpenImage - функция открытия картинки по клику
// output: DOM-узел новой карточки

function createCard(card, handleDelete, handleOpenImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const deleteButton = cardItem.querySelector('.card__delete-button');

  cardItem.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  deleteButton.addEventListener('click', () => {
    handleDelete(cardItem);
  });

  cardImage.addEventListener('click', () => {
    handleOpenImage(card.name, card.link);
  });

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