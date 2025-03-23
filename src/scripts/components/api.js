// Токен: 025ba30a-6c57-44d8-9f11-68a718bec502
// Идентификатор группы: wff-cohort-35

// Функция вывода данных профиля

function getUserData (apiConfig, profileName, profileJob, profileImage) {
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
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
      profileImage.src = data.avatar;
    })
    .catch((err) => {
      console.log(err);
    });
};

// Функция вывода карточек

function getCards (apiConfig) {
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
      return Promise.reject(res.status);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return Promise.reject(`Ошибка при инициализации карточек: ${err}`);
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
    .catch((err) => {
      return Promise.reject(`Ошибка при редактировании профиля: ${err}`);
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
      return Promise.reject(res.status);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return Promise.reject(`Ошибка при добавлении карточки: ${err}`);
    });
};

// 



export { getUserData, getCards, patchEditProfile, postNewCard };