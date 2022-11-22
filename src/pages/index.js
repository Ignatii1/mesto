import {
  profileEditButton,
  cardAddButton,
  popupEditForm,
  popupAddForm,
  popupImage,
  popupPhotoImageDescription,
  userName,
  userDescription,
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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: '5669c063-4c85-4d28-8ba4-8813e38df69e',
    'Content-Type': 'application/json'
  }
})

Promise.all([])

// const userInfo = api.getUserInfo();
// console.log(userInformation);
// // userName.textContent = result.name;
// // userDescription.textContent = result.about;
// // userAvatar.src = result.avatar;

// function renderServerCards() {

// }
// renderServerCards();

function handleDeleteCard(card) {
  popupConfirmation.open(card);
}

function handleConfirmSubmit(card) {
  this._card.remove();
}

function handleCardClick(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupPhotoImageDescription.innerText = name;
  popupWithImage.open(link, name);
}

function createCard(item) {
  const card = new Card(item, '#item__template', handleCardClick, handleDeleteCard);
  return card.generateCard();
}

function renderer(item) {
  const card = createCard(item);
  cardList.addItem(card);
}

function handleAddSubmit(inputs) {
  fetch('https://mesto.nomoreparties.co/v1/cohort-54/cards', {
    method: 'POST',
    headers: {
      authorization: '5669c063-4c85-4d28-8ba4-8813e38df69e',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(inputs)
  })
    .then(res => res.json())
    .then(res => cardList.addItem(createCard(res)));
}

const userInfo = new UserInfo('.profile__name', '.profile__description');

const cardList = new Section({ renderer }, '.photo-grid');

const popupEditProfile = new PopupWithForm('.popup_edit', ({ name, description }) => {
  userInfo.setUserInfo({ name, description });
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_add', handleAddSubmit);
popupAddCard.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_photo');
popupWithImage.setEventListeners();

const popupConfirmation = new PopupWithConfirmation('.popup_confirmation', handleConfirmSubmit);
popupConfirmation.setEventListeners();

// EVENT LISTENERS ADD

cardAddButton.addEventListener('click', function () {
  popupAddCard.open();
  cardFormValidator.validateOnOpen();
})

profileEditButton.addEventListener('click', function () {
  const profileInputValues = userInfo.getUserInfo();
  inputName.value = profileInputValues.name;
  inputDescription.value = profileInputValues.description;
  popupEditProfile.open();
  profileFormValidator.validateOnOpen();
})

// FORMS validation

const cardFormValidator = new FormValidator(validationConfig, popupAddForm);
const profileFormValidator = new FormValidator(validationConfig, popupEditForm);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
