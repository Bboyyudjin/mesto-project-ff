// Закрытие попапов
export function addCloseListeners(popup){
  popup.querySelector('.popup__close').addEventListener('click',() => closePopup(popup));
  popup.addEventListener('click',(evt) => closePopupByOverflow(popup, evt));
}

function closePopupByOverflow(popup, evt) {
  if (evt.target === popup) {
    closePopup(popup);
  }
};

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector(".popup_is-opened")
    closePopup(popup);
  }
};

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener('keydown', closePopupByEsc);
};

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closePopupByEsc);
}