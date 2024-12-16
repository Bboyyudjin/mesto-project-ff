import {createCard} from "../components/card.js";
import {openPopup, closePopup, addCloseListeners} from "../components/modal.js";
import {enableValidation, clearValidation} from "../components/validation.js";
import {getUserInfo, getInitialCards, updateUserInfo, addCard, deleteCard, addLike, updateAvatar} from "../components/api.js"
import {loading} from "../components/utils.js"
import '../pages/index.css';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  invalidInputClass: 'popup__input_invalid'
};

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const cardImg = popupImage.querySelector('.popup__image');
const cardName = popupImage.querySelector('.popup__caption');
const popupAvatar = document.querySelector('.popup_type_avatar');
const profileAvatar = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector(".profile__description");
let userId;

enableValidation(validationConfig);

// Открытие попапов
document.querySelector('.profile__edit-button').addEventListener('click',() => {openPopup(popupTypeEdit); makeDefaultProfile(); clearValidation(popupTypeEdit, validationConfig)});
document.querySelector('.profile__add-button').addEventListener('click',() => {openPopup(popupNewCard); makeNewCardDefaults(); clearValidation(popupNewCard, validationConfig)});
document.querySelector('.profile__image').addEventListener('click',() => {openPopup(popupAvatar); makeAvatarDefaults(); clearValidation(popupAvatar, validationConfig)});
document.querySelectorAll('.popup').forEach(popup => addCloseListeners(popup)); 

// Редактирование профиля
const formEditProfile = document.forms["edit-profile"];
const formNewCard = document.forms["new-place"];
const formNewAvatar = document.forms["avatar-change"]
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const avatarInput = formNewAvatar.querySelector(".popup__input_type_avatar");

// Текущие данные профиля
function makeDefaultProfile(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
};

// Изменение профиля
function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    loading(popupTypeEdit, true)
    updateUserInfo(nameInput.value, jobInput.value)
      .then (() => {
        closePopup(popupTypeEdit)
        profileName.textContent = nameInput.value;
        profileAbout.textContent = jobInput.value;
      })
      .catch(console.error)
      .finally (() => {
        loading(popupTypeEdit, false)
      })
    
}

formEditProfile.addEventListener('submit', handleEditProfileSubmit);

// Добавление карточки
const cardNameInput = popupNewCard.querySelector(".popup__input_type_card-name");
const urlInput = popupNewCard.querySelector(".popup__input_type_url");

function makeNewCardDefaults(){
  formNewCard.reset();
};

function addNewCard(evt) {
  evt.preventDefault();
  loading(popupNewCard, true);
  const newCard = [];
  newCard.name = cardNameInput.value;
  newCard.link = urlInput.value;
  addCard(newCard)
    .then(card => {
      const cardElement = createCard ({card, cardTemplate, deleteCard, addLike, openModalImage, userId});
      cardList.prepend(cardElement);
      closePopup(popupNewCard);
    })
    .catch(console.error)
    .finally (() => {
      loading(popupNewCard, false)
    })
}

formNewCard.addEventListener('submit', addNewCard);

function openModalImage(card) {
  openPopup(popupImage);
  cardImg.src = card.src;
  cardImg.alt = card.alt;
  cardName.textContent = card.alt;
}

formNewAvatar.addEventListener('submit', editProfileAvatar);

function makeAvatarDefaults () {
  formNewAvatar.reset();
}

function editProfileAvatar (evt) {
  evt.preventDefault();
  loading(popupAvatar, true)
  updateAvatar(avatarInput.value)
    .then ((res) => {
      closePopup(popupAvatar)
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch(console.error)
    .finally (() => {
      loading(popupAvatar, false)
    })
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cardsInfo]) => {
      userId = userInfo._id
      profileName.textContent = userInfo.name
      profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`
      profileAbout.textContent = userInfo.about
      cardsInfo.forEach(card =>{
        cardList.append(createCard({card, cardTemplate, deleteCard, addLike, openModalImage, userId}))
      })
  })
  .catch(console.error)
