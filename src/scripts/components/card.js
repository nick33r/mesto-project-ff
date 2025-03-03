// DOM узлы

const placesList = document.querySelector('.places__list');

// Функция создания карточки

function createCard(card, handleDelete) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const deleteButton = cardItem.querySelector('.card__delete-button');

  cardItem.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  placesList.appendChild(cardItem);

  deleteButton.addEventListener('click', () => {
    handleDelete(cardItem);
  });
}

// Функция удаления карточки

function deleteCard(itemToDelete) {
  itemToDelete.remove();
}

// 



export { createCard, deleteCard };