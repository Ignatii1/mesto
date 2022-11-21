export { Card };

class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;

    this._element = this._getTemplate();
    this._likesNumber = this._element.querySelector('.photo-grid__like-count');
    this._cardImage = this._element.querySelector('.photo-grid__card-img');
    this._cardName = this._element.querySelector('.photo-grid__card-name');
    this._likeButton = this._element.querySelector('.photo-grid__card-btn');
    this._deleteButton = this._element.querySelector('.photo-grid__delete-btn');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photo-grid__card')
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle('photo-grid__card-btn_liked');
    if (this._likeButton.classList.contains("photo-grid__card-btn_liked")) {
      this._likesNumber.innerText = parseInt(this._likesNumber.innerText) + 1;
    } else {
      this._likesNumber.innerText -= 1;
    }
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _addLikeButtonListener() {
    this._likeButton.addEventListener('click', this._handleLikeCard.bind(this));
  }

  _addDeleteButtonListener() {
    this._deleteButton.addEventListener('click', this._handleDeleteCard.bind(this));
  }

  _addPopupListener() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  _addEventListeners() {
    this._addLikeButtonListener();
    this._addDeleteButtonListener();
    this._addPopupListener();
    return this._element;
  }

  generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.innerText = this._name;
    this._likesNumber.innerText = this._likes.length;

    this._element = this._addEventListeners(this._element);
    return this._element;
  }
}

