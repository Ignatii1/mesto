import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.form');
    this._submitButton = this._popupForm.querySelector('.popup__submit');
    this._submitBtnText = this._submitButton.textContent;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const inputs = {};
    this._inputList.forEach(item => {
      inputs[item.name] = item.value;
    })
    return inputs;
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitBtnText;
    }
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}


