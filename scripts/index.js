// @todo: Темплейт карточки

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(card, handleDelete) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardItem.querySelector('.card__delete-button');

  cardItem.querySelector('.card__title').textContent = card.name;
  cardItem.querySelector('.card__image').src = card.link;
  cardItem.querySelector('.card__image').alt = card.name;

  placesList.appendChild(cardItem);

  deleteButton.addEventListener('click', () => {
    handleDelete(deleteButton);
  });
}

// @todo: Функция удаления карточки

function deleteCard(deleteButton) {
  deleteButton.closest('.card').remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(card => createCard(card, deleteCard));