export function loading(popup, isLoading) {
  const button = popup.querySelector(".popup__button");
  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
  }