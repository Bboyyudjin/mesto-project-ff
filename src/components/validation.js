const showInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  inputElement.classList.add(validationConfig.invalidInputClass);
  errorElement.classList.add(validationConfig.errorClass)
  if (inputElement.validity.patternMismatch) {
    errorElement.textContent = inputElement.dataset.errorMessage;
  } else {
    errorElement.textContent = inputElement.validationMessage;
  }
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  inputElement.classList.remove(validationConfig.invalidInputClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

const disableButton = (buttonElement, validationConfig) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationConfig);
  });
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  disableButton(buttonElement, validationConfig);
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationConfig);
} else {
  buttonElement.disabled = false;
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}
}