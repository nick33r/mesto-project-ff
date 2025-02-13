// @todo: Темплейт карточки

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardIndex) {
  const cardTemplate = document.querySelector('#card-template');
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const placesList = document.querySelector('.places__list');

  cardItem.querySelector('.card__title').textContent = initialCards[cardIndex].name;
  cardItem.querySelector('.card__image').src = initialCards[cardIndex].link;
  cardItem.querySelector('.card__image').alt = initialCards[cardIndex].name;

  placesList.appendChild(cardItem);
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

for (let i = 0; i < initialCards.length; i++) {
  createCard(i);
}