import {createCard} from "../components/card.js";
import {openPopup, closePopup, addCloseListeners, loading} from "../components/modal.js";
import {enableValidation, clearValidation} from "../components/validation.js";
import {getUserInfo, getInitialCards, updateUserInfo, addCard, deleteCard, addLike, updateAvatar} from "../components/api.js"
import '../pages/index.css';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const profileAvatar = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector(".profile__description");
let userId;

enableValidation();

// Открытие попапов
document.querySelector('.profile__edit-button').addEventListener('click',() => {openPopup(popupTypeEdit); makeDefaultProfile(); clearValidation(popupTypeEdit)});
document.querySelector('.profile__add-button').addEventListener('click',() => {openPopup(popupNewCard); makeNewCardDefaults(); clearValidation(popupNewCard)});
document.querySelector('.profile__image').addEventListener('click',() => {openPopup(popupAvatar); makeAvatarDefaults(); clearValidation(popupAvatar)});
document.querySelectorAll('.popup').forEach(popup => addCloseListeners(popup)); 

// Редактирование профиля
const formEditProfile = document.querySelector(".popup__form[name='edit-profile']");
const formNewCard = document.querySelector(".popup__form[name='new-place']");
const formNewAvatar = document.querySelector(".popup__form[name='avatar-change']")
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const avatarInput = formNewAvatar.querySelector(".popup__input_type_avatar");

// Текущие данные профиля
function makeDefaultProfile(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
};

makeDefaultProfile();

// Изменение профиля
function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    loading(popupTypeEdit, true)
    updateUserInfo(nameInput.value, jobInput.value)
      .then (closePopup(popupTypeEdit))
      .catch(err => {
        console.log(err);
      })
      .finally (() => {
        loading(popupTypeEdit, false)
      })
    
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
  const newCard = [];
  newCard.name = cardNameInput.value;
  newCard.link = urlInput.value;
  loading(popupNewCard, true)
  addCard(newCard)
    .then(newCard => {
      const cardElement = createCard (newCard, cardTemplate, deleteCard, addLike, openModalImage, userId);
      cardList.prepend(cardElement);
      closePopup(popupNewCard);
      makeNewCardDefaults();
    })
    .catch(err => {
      console.log(err);
    })
    .finally (() => {
      loading(popupNewCard, false)
    })
}

formNewCard.addEventListener('submit', addNewCard);

function openModalImage(card) {
  openPopup(popupImage);
  popupImage.querySelector('.popup__image').src = card.src;
  popupImage.querySelector('.popup__image').alt = card.alt;
  popupImage.querySelector('.popup__caption').textContent = card.alt;
}

formNewAvatar.addEventListener('submit', editProfileAvatar);

function makeAvatarDefaults () {
  avatarInput.value = '';
}

function editProfileAvatar (evt) {
  evt.preventDefault();
  profileAvatar.style.backgroundImage = `url(${avatarInput.value})`;
  loading(popupAvatar, true)
  updateAvatar(avatarInput.value)
    .then (closePopup(popupAvatar))
    .catch(err => {
      console.log(err);
    })
    .finally (() => {
      loading(popupAvatar, false)
    })
  makeAvatarDefaults();
}


Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cardsInfo]) => {
      userId = userInfo._id
      profileName.textContent = userInfo.name
      profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`
      profileAbout.textContent = userInfo.about
      cardsInfo.forEach(card =>{
        cardList.append(createCard(card, cardTemplate, deleteCard, addLike, openModalImage, userId))
      })
  })
  .catch(err => {
    console.log(err);
  });
