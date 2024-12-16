export function createCard ({card, cardTemplate, deleteCard, addLike, openModalImage, userId}) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const likeButton = newCard.querySelector('.card__like-button');
  const deleteButton = newCard.querySelector('.card__delete-button');
  const likesCounter = newCard.querySelector('.card__like-count');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click',() => openModalImage(cardImage));
  newCard.querySelector('.card__title').textContent = card.name;

  if (card.owner._id === userId) {
    deleteButton.addEventListener('click', () => {
      deleteCard(card)
        .then(() => deleteCardFromHtml(newCard))
        .catch(console.error)
    });
  } else {
    deleteButton.style.display = "none";
  }

  likesCounter.textContent = card.likes.length
  likeButton.addEventListener('click', () => {
    addLike(card, userId)
      .then ((res) => {
        card.likes = res.likes;
        likesCounter.textContent = res.likes.length
        like(likeButton)
      })
      .catch(console.error)
  });
  if (card.likes.some(user => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  return newCard;
};

function deleteCardFromHtml(card) {
  card.remove();
};

function like(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}