import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmSubmit) {
    super(popupSelector);
    this._handleConfirmSubmit = handleConfirmSubmit;
    this._popupForm = this._popup.querySelector('.form');
    this._submitButton = this._popup.querySelector('.popup__submit');
    this._submitBtnText = this._submitButton.textContent;
  }

  open(cardId, card) {
    this._cardId = cardId;
    this._card = card;
    super.open();
  }

  renderLoading(isLoading, loadingText = 'Удаление...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitBtnText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleConfirmSubmit();
    });
  }
}
