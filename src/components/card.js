import {cardTemplate} from "../scripts/index.js";

export function createCard (card, deleteCard, like, openModalImage) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const button = newCard.querySelector('.card__like-button');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click',() => openModalImage(cardImage));
  newCard.querySelector('.card__title').textContent = card.name;
  newCard.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(newCard));
  button.addEventListener('click', () => like(button));
  return newCard;
};

// Функция удаления карточки
export function deleteCard(card) {
  card.remove();
};
// Функции добавления/снятия лайка
export function like(button) {
  button.classList.add("card__like-button_is-active");
  button.addEventListener('click', () => unlike(button));
}

function unlike(button) {
  button.classList.remove("card__like-button_is-active");
  button.addEventListener('click', () => like(button));
}