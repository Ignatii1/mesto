export {Card};

class Card {
  constructor(data, templateSelector, onPopupClicked) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._onPopupClicked = onPopupClicked;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photo-grid__card')
      .cloneNode(true);

    return cardElement;
  }

  _addLikeButtonListener(card) {
    const likeButton = card.querySelector('.photo-grid__card-btn');
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('photo-grid__card-btn_liked');
    });
    return card;
  }

  _addDeleteButtonListener(card) {
    const deleteButton = card.querySelector('.photo-grid__delete-btn');

    deleteButton.addEventListener('click', () => {
      card.remove();
    });
    return card;
  }

  _addPopupListener(card) {
    const cardImage = card.querySelector('.photo-grid__card-img');
    const popupImage = document.querySelector('.popup__image');
    const popupPhotoImageDescription = document.querySelector('.popup__description');
    const popupPhoto = document.querySelector('.popup_photo');

    cardImage.addEventListener('click', () => {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupPhotoImageDescription.innerText = this._name;
      this._onPopupClicked(popupPhoto);
    });

    return card;
  }

  _addEventListeners(card) {
    this._addLikeButtonListener(card);
    this._addDeleteButtonListener(card);
    this._addPopupListener(card);
    return card;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.photo-grid__card-img').src = this._link;
    this._element.querySelector('.photo-grid__card-img').alt = this._name;
    this._element.querySelector('.photo-grid__card-name').innerText = this._name;

    this._element = this._addEventListeners(this._element);
    return this._element;
  }
}

