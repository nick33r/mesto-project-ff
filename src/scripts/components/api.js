// Пример конфига который принимается на вход функциям
// const apiConfig = {
//   baseUrl: 'https://nomoreparties.co/v1/wff-fffff',
//   headers: {
//     authorization: '025ba30a-6c57-dsccs',
//     'Content-Type': 'application/json'
//   }
// };

// Функция вывода данных профиля

function getUserData (apiConfig) {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      authorization: apiConfig.headers.authorization
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при инициализации пользователя: ${res.status}`);
    });
};

// Функция вывода карточек

function getCardsData (apiConfig) {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'GET',
    headers: {
      authorization: apiConfig.headers.authorization
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при инициализации карточек: ${res.status}`);
    });
};

// Функция редактирования профиля

function patchEditProfile (apiConfig, nameElement, jobElement) {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: apiConfig.headers.authorization,
      'Content-Type': apiConfig.headers['Content-Type']
    },
    body: JSON.stringify({
      name: nameElement.value,
      about: jobElement.value
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при редактировании профиля: ${res.status}`);
    });
};

// Функция добавления новой карточки

function postNewCard (apiConfig, imageNameInput, linkInput) {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: apiConfig.headers.authorization,
      'Content-Type': apiConfig.headers['Content-Type']
    },
    body: JSON.stringify({
      name: imageNameInput.value,
      link: linkInput.value
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при добавлении карточки: ${res.status}`);
    });
};

// Функция удаления карточки из базы данных

function deleteCardInDatabase (apiConfig, cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: apiConfig.headers.authorization
    }
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка при удалении карточки: ${res.status}`);
      }
    });
};

// Функция лайка карточки

function toggleLike (apiConfig, cardId, method) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: apiConfig.headers.authorization
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при лайке карточки: ${res.status}`);
    });
};

// Функция обновления аватара

function patchAvatar (apiConfig, linkInput) {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: apiConfig.headers.authorization,
      'Content-Type': apiConfig.headers['Content-Type']
    },
    body: JSON.stringify({
      avatar: linkInput.value
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при обновлении аватара: ${res.status}`);
    });
};

export { getUserData, getCardsData, patchEditProfile, postNewCard, deleteCardInDatabase, toggleLike, patchAvatar };