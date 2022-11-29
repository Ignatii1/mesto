export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteCard, handleLikeCard, userId) {
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleLikeCard = handleLikeCard;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;

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

  _addLikeButtonListener() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard(this);
    })
  }

  _addDeleteButtonListener() {
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard(this._cardId, this._element);
    })
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

  setLikeCount(likesNumber) {
    this._likesNumber.innerText = likesNumber;
  }

  setLikeData(data) {
    this._likes = data;
  }

  isLiked() {
    return Boolean(this._likes.find(like => like._id === this._userId));
  }

  addLike() {
    this._likeButton.classList.add('photo-grid__card-btn_liked');
  }

  removeLike() {
    this._likeButton.classList.remove('photo-grid__card-btn_liked');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.innerText = this._name;
    this._likesNumber.innerText = this._likes.length;
    this._deleteBtn = this._element.querySelector('.photo-grid__delete-btn');

    if (this._ownerId !== this._userId) {
      this._deleteBtn.classList.add('photo-grid__delete-btn_hidden');
    }

    if (this.isLiked()) { this._likeButton.classList.add('photo-grid__card-btn_liked')}

    this._element = this._addEventListeners(this._element);
    return this._element;
  }
}

