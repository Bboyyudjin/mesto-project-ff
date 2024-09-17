import {createCard, deleteCard, like} from "../components/card.js";
import {openPopup, closePopup, addCloseListeners} from "../components/modal.js";
import {initialCards} from "../components/cards.js";
import '../pages/index.css';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

// Вывести карточки на страницу
initialCards.forEach(card => {
  cardList.append(createCard(card, cardTemplate, deleteCard, like, openModalImage));
});

// Открытие попапов
document.querySelector('.profile__edit-button').addEventListener('click',() => {openPopup(popupTypeEdit); makeDefaultProfile()});
document.querySelector('.profile__add-button').addEventListener('click',() => {openPopup(popupNewCard); makeNewCardDefaults()});
document.querySelectorAll('.popup').forEach(popup => addCloseListeners(popup)); 

// Редактирование профиля
const formEditProfile = document.querySelector(".popup__form[name='edit-profile']");
const formNewCard = document.querySelector(".popup__form[name='new-place']");
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__description");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

// Текущие данные профиля
function makeDefaultProfile(){
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
};

makeDefaultProfile();

// Изменение профиля
function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupTypeEdit);
}

formEditProfile.addEventListener('submit', handleEditProfileSubmit);

// Добавление карточки
const cardNameInput = popupNewCard.querySelector(".popup__input_type_card-name");
const urlInput = popupNewCard.querySelector(".popup__input_type_url");

function makeNewCardDefaults(){
  cardNameInput.value = '';
  urlInput.value = '';
};

function addNewCard(evt) {
  evt.preventDefault();
  const newCard =[];
  newCard.name = cardNameInput.value;
  newCard.link = urlInput.value;
  cardList.prepend(createCard (newCard, cardTemplate, deleteCard, like, openModalImage));
  makeNewCardDefaults();
  closePopup(popupNewCard);
}

formNewCard.addEventListener('submit', addNewCard);

function openModalImage(card) {
  openPopup(popupImage);
  popupImage.querySelector('.popup__image').src = card.src;
  popupImage.querySelector('.popup__image').alt = card.alt;
  popupImage.querySelector('.popup__caption').textContent = card.alt;
}