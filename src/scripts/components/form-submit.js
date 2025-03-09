import {createCard, deleteCard, likeCard} from './card.js';

// Функция отправки формы редактирования профиля
// input: evt - событие отправки формы
// input: configObject - объект с конфигом, должен содержать newName, newJob, name, job
//     Пример конфига
// const profileEditConfig = {
//   newName: nameInput, (поле ввода имени в попапе)
//   newJob: jobInput, (поле ввода профессии в попапе)
//   name: nameElement, (имя в контейнере профиля)
//   job: jobElement (профессия в контейнере профиля)
// };
// output: изменение имени и профессии в контейнере профиля

function formEditSubmit(evt, configObject) {
  evt.preventDefault();

  const name = configObject.newName.value;
  const job = configObject.newJob.value;
  
  configObject.name.textContent = name;
  configObject.job.textContent = job;
};

// Функция отправки формы добавления карточки
// input: evt - событие отправки формы
// input: cardNameInput - DOM-узел поля ввода названия в попапе
// input: imageLinkInput - DOM-узел поля ввода ссылки на картинку в попапе
// output: DOM-узел новой карточки

function formAddCardSubmit(evt, cardNameInput, imageLinkInput) {
  evt.preventDefault();

  const newCard = {
    name: cardNameInput.value,
    link: imageLinkInput.value
  };
  
  const newCardElement = createCard(newCard, deleteCard, likeCard);

  cardNameInput.value = '';
  imageLinkInput.value = '';

  return newCardElement;
};

export { formAddCardSubmit, formEditSubmit };