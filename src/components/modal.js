// Закрытие попапов
function addCloseListeners(popup){
  popup.querySelector('.popup__close').addEventListener('click',() => closePopupByButton(popup));
  popup.addEventListener('click',(evt) => closePopupByOverflow(popup, evt));
  document.addEventListener('keydown', closePopupByEsc);
}

document.querySelectorAll('.popup').forEach(popup => addCloseListeners(popup));

function closePopupByButton(popup) {
  closePopup(popup);
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
};

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closePopupByEsc);
}