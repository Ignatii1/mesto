import {
  profileEditButton,
  cardAddButton,
  popupEditForm,
  popupAvatarForm,
  popupAddForm,
  popupImage,
  popupPhotoImageDescription,
  userAvatar,
  inputName,
  inputDescription,
  validationConfig
} from '../utils/constants.js';

import '../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

let userId;
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: '5669c063-4c85-4d28-8ba4-8813e38df69e',
    'Content-Type': 'application/json'
  }
});


Promise.all([api.getUserInfo(), api.getCards()])
  .then(res => {
    const [profileInfo, cardsArray] = res;
    userInfo.setUserInfo(profileInfo);
    userId = userInfo.getId();

    cardList.renderItems(cardsArray.reverse());
  })
  .catch(err => console.log(err));

// HANDLERS

function handleDeleteCard(cardId, card) {
  popupConfirmation.open(cardId, card);
}

function handleConfirmSubmit() {
  this._submitButton.textContent = 'Удаление...';
  api.deleteCard(this._cardId)
    .then(() => {
      this._card.remove();
      this._card = null;
      popupConfirmation.close();
    })
    .finally(() => this._submitButton.textContent = 'Да');

}

function handleEditProfile({ name, description }) {
  this._submitButton.textContent = "Сохранение...";
  api.updateProfile({ name, description })
    .then(res => {
      userInfo.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => this._submitButton.textContent = "Сохранить");
}

function handleAddSubmit(inputs) {
  this._submitButton.textContent = "Сохранение...";
  api.postCard(inputs)
    .then(res => {
      renderer(res);
      popupAddCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => this._submitButton.textContent = "Сохранить");
}

function handleUpdateAvatar({ avatar }) {
  this._submitButton.textContent = "Сохранение...";
  api.updateAvatar(avatar)
    .then(res => {
      userInfo.setAvatar(res.avatar);
      popupAvatarUpdate.close();
    })
    .catch((err) => console.log(err))
    .finally(() => this._submitButton.textContent = "Сохранить");
}

function handleCardClick(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupPhotoImageDescription.innerText = name;
  popupWithImage.open(link, name);
}

function handleLikeCard() {
  if (this.isLiked()) {
    api.removeLike(this._cardId)
      .then(res => {
        this.setLikeCount(res.likes.length);
        this._likes = res.likes;
      });
    this._likeButton.classList.remove('photo-grid__card-btn_liked')
  } else {
    api.addLike(this._cardId)
      .then(res => {
        this.setLikeCount(res.likes.length);
        this._likes = res.likes;
      });
    this._likeButton.classList.add('photo-grid__card-btn_liked')
  }
}


function renderer(item) {
  const card = createCard(item);
  cardList.addItem(card);
}

function createCard(item) {
  const card = new Card(item, '#item__template', handleCardClick, handleDeleteCard, handleLikeCard, userId);
  return card.generateCard();
}

const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');

const cardList = new Section({ renderer }, '.photo-grid');

// POPUPS

const popupAddCard = new PopupWithForm('.popup_add', handleAddSubmit);
const popupWithImage = new PopupWithImage('.popup_photo');
const popupEditProfile = new PopupWithForm('.popup_edit', handleEditProfile);
const popupConfirmation = new PopupWithConfirmation('.popup_confirmation', handleConfirmSubmit);
const popupAvatarUpdate = new PopupWithForm('.popup_updateAvatar', handleUpdateAvatar);

// FORMS validation

const cardFormValidator = new FormValidator(validationConfig, popupAddForm);
const profileFormValidator = new FormValidator(validationConfig, popupEditForm);
const avatarFormValidator = new FormValidator(validationConfig, popupAvatarForm);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Event Listeners

popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();
popupConfirmation.setEventListeners();
popupAvatarUpdate.setEventListeners();

userAvatar.addEventListener('click', function() {
  avatarFormValidator.validateOnOpen();
  popupAvatarUpdate.open();
})

cardAddButton.addEventListener('click', function() {
  popupAddCard.open();
  cardFormValidator.validateOnOpen();
})

profileEditButton.addEventListener('click', function() {
  const profileInputValues = userInfo.getUserInfo();
  inputName.value = profileInputValues.name;
  inputDescription.value = profileInputValues.description;
  popupEditProfile.open();
  profileFormValidator.validateOnOpen();
})
