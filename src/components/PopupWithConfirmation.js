import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmSubmit) {
    super(popupSelector);
    this._handleConfirmSubmit = handleConfirmSubmit;
  }

  open(cardId, card) {
    this._cardId = cardId;
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleConfirmSubmit();
      this.close();
    });
  }
}
