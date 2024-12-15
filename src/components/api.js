const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-28',
  headers: {
    authorization: '2ce07d2c-6a68-45be-8e63-bd0f31432b5b',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkFetch);
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkFetch)
}

export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    })
  })
  .then(checkFetch)
}

export const addCard = (newCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${newCard.name}`,
      link: `${newCard.link}`
    })
  })
  .then (checkFetch)
}

export const deleteCard = (card) => {
  return fetch(`${config.baseUrl}/cards/${card._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkFetch)
}

export const addLike = (card, userId) => { 
  const method = card.likes.some(user => user._id === userId) ? 'DELETE' : 'PUT';
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, { 
      method: method, 
      headers: config.headers 
  })
  .then(checkFetch)
}

export const updateAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(checkFetch)
}

const checkFetch = (res) => { 
  if (res.ok) { 
      return res.json();
  } 
  return Promise.reject(`Ошибка: ${res.status}`); 
}
