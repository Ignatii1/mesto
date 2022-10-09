export { FormValidator };

class FormValidator {
  constructor(validationConfig, elementToValidate) {
    this._validationConfig = validationConfig;
    this._elementToValidate = elementToValidate;
    this._buttonElement = this._elementToValidate.querySelector(this._validationConfig.submitButtonSelector);
    this._inputList = Array.from(this._elementToValidate.querySelectorAll(this._validationConfig.inputSelector));
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement)=>{
      return !inputElement.validity.valid;
    })
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._elementToValidate.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._elementToValidate.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.errorClass);
    errorElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', 'disabled');
      this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  validateOnOpen = () => {
    const formInputs = Array.from(this._elementToValidate.querySelectorAll(this._validationConfig.inputSelector));
    this._toggleButtonState(formInputs);
  }

  enableValidation() {
    this._elementToValidate.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._setEventListeners();
  }
}
