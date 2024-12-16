const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-28',
  headers: {
    authorization: '2ce07d2c-6a68-45be-8e63-bd0f31432b5b',
    'Content-Type': 'application/json'
  }
}

function request(url, options) {
  return fetch(url, options)
  .then(checkFetch)
}

export const getInitialCards = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
}

export const getUserInfo = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
}

export const updateUserInfo = (name, about) => {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    })
  })
}

export const addCard = (newCard) => {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${newCard.name}`,
      link: `${newCard.link}`
    })
  })
}

export const deleteCard = (card) => {
  return request(`${config.baseUrl}/cards/${card._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export const addLike = (card, userId) => { 
  const method = card.likes.some(user => user._id === userId) ? 'DELETE' : 'PUT';
  return request(`${config.baseUrl}/cards/likes/${card._id}`, { 
      method: method, 
      headers: config.headers 
  })
}

export const updateAvatar = (url) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
}

const checkFetch = (res) => { 
  if (res.ok) { 
      return res.json();
  } 
  return Promise.reject(`Ошибка: ${res.status}`); 
}
