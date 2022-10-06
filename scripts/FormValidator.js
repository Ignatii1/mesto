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

  validateOnOpen = (form) => {
    const formInputs = Array.from(form.querySelectorAll(this._validationConfig.inputSelector));
    const buttonElement = form.querySelector(this._validationConfig.submitButtonSelector);
    this._toggleButtonState(formInputs, buttonElement);
  }

  enableValidation(formElement) {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._setEventListeners(formElement);
  }
}
