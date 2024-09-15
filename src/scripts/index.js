import {createCard, deleteCard, like} from "../components/card.js";
import {openModalImage, openModal} from "../components/modal.js";
import {initialCards} from "../components/cards.js";
import '../pages/index.css';

export const cardTemplate = document.querySelector('#card-template').content;
export const cardList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupImage = document.querySelector('.popup_type_image');

// Вывести карточки на страницу
initialCards.forEach(card => {
  cardList.append(createCard(card, deleteCard, like, openModalImage));
});

// Открытие попапов
document.querySelector('.profile__edit-button').addEventListener('click',() => openModal(popupTypeEdit));
document.querySelector('.profile__add-button').addEventListener('click',() => openModal(popupNewCard));
 

// Редактирование профиля
const profile = document.querySelector(".profile__info");
const name = profile.querySelector(".profile__title");
const job = profile.querySelector(".profile__description");
const nameInput = popupTypeEdit.querySelector(".popup__input_type_name");
const jobInput = popupTypeEdit.querySelector(".popup__input_type_description");

// Текущие данные профиля
export function defaultprofile(){
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
};
defaultprofile();

// Изменение профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupTypeEdit.classList.remove("popup_is-opened");
}

popupTypeEdit.addEventListener('submit', handleFormSubmit);

// Добавление карточки
const cardNameInput = popupNewCard.querySelector(".popup__input_type_card-name");
const urlInput = popupNewCard.querySelector(".popup__input_type_url");

export function newCardDefaults(){
  cardNameInput.value = '';
  urlInput.value = '';
}

function addNewCard(evt) {
  evt.preventDefault();
  const newCard =[];
  newCard.name = cardNameInput.value;
  newCard.link = urlInput.value;
  cardList.prepend(createCard (newCard, deleteCard, like, openModalImage));
  newCardDefaults()
  popupNewCard.classList.remove("popup_is-opened");
}

popupNewCard.addEventListener('submit', addNewCard);