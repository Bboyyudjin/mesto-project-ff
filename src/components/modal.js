import {popupImage, newCardDefaults, defaultprofile} from "../scripts/index.js";

export function openModal(item) {
  item.classList.add("popup_is-opened");
  closeModal(item);
}

export function openModalImage(card) {
  popupImage.classList.add("popup_is-opened");
  popupImage.querySelector('.popup__image').src = card.src;
  popupImage.querySelector('.popup__caption').textContent = card.alt;
  closeModal(popupImage);
}
// Закрытие попапов
function closeModal(item){
  item.querySelector('.popup__close').addEventListener('click',() => closeModalButton(item));
  item.addEventListener('click',(evt) => closeModalOverflow(item, evt));
  document.addEventListener('keydown',(evt) => closeModalEsc(item, evt));
}
  
function closeModalButton(item) {
  item.classList.remove("popup_is-opened");
  defaultprofile();
  newCardDefaults();
}

function closeModalOverflow(item, evt) {
  if (evt.target === item) {
    item.classList.remove("popup_is-opened");
    defaultprofile();
    newCardDefaults()
  }
};

function closeModalEsc(item, evt) {
  if (evt.key === 'Escape') {
    item.classList.remove("popup_is-opened");
    document.removeEventListener('keydown',(evt) => closeModalEsc(item, evt));
    defaultprofile();
    newCardDefaults();
  }
};