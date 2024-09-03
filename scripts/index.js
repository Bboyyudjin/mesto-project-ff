// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(card, deleteCard) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__title').textContent = card.name;
  newCard.querySelector('.card__image').src = card.link;
  newCard.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(newCard));
  return newCard;
}
// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  cardList.append(createCard(card, deleteCard));
})