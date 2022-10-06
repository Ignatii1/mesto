export { FormValidator };

class FormValidator {
  constructor(validationConfig, elementToValidate) {
    this._validationConfig = validationConfig;
    this._elementToValidate = elementToValidate;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement)=>{
      return !inputElement.validity.valid;
    })
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.inputErrorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.errorClass);
    errorElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', 'disabled');
      buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(this._validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation(formElement) {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._setEventListeners(formElement);
  }
}

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
//   const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
//   const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
//   const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };

// const enableValidation = (validationConfig) => {
  // const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  // formList.forEach((formElement) => {
  //   formElement.addEventListener('submit', (evt) => {
  //     evt.preventDefault();
  //   })
  //   setEventListeners(formElement);
  // })
// }

// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(validationConfig.errorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(validationConfig.inputErrorClass);
// };

// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(validationConfig.errorClass);
//   errorElement.classList.remove(validationConfig.inputErrorClass);
//   errorElement.textContent = '';
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement)=>{
//     return !inputElement.validity.valid;
//   })
// }

// const toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.setAttribute('disabled', 'disabled');
//     buttonElement.classList.add(validationConfig.inactiveButtonClass);
//   } else {
//     buttonElement.removeAttribute('disabled');
//     buttonElement.classList.remove(validationConfig.inactiveButtonClass);
//   }
// }

// const validateOnOpen = (form) => {
//   const formInputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
//   const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
//   toggleButtonState(formInputs, buttonElement);
//   formInputs.forEach((formInput) => {
//     checkInputValidity(form, formInput);
//   });
// };
