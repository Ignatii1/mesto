import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, link, name) {
    super(popupSelector);
    this._popupImage = document.querySelector('.popup__image');
    this._popupDescription = document.querySelector('.popup__description');
  }

  open(link, description) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = description;
    this._popupDescription.innerText = description;
  }
}
