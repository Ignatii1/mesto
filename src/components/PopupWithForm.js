import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector('.popup__submit');
  }

  _getInputValues() {
    const inputs = {};
    const inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    inputList.forEach(item => {
      inputs[item.name] = item.value;
    })
    return inputs;
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


