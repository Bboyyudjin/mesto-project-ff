export function createCard (card, cardTemplate, deleteCard, like, openModalImage) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const likeButton = newCard.querySelector('.card__like-button');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click',() => openModalImage(cardImage));
  newCard.querySelector('.card__title').textContent = card.name;
  newCard.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(newCard));
  likeButton.addEventListener('click', () => like(likeButton));
  return newCard;
};

// Функция удаления карточки
export function deleteCard(card) {
  card.remove();
};
// Функция добавления/снятия лайка
export function like(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}