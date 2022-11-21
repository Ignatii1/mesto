import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const popupEditForm = document.querySelector('.popup__container');
const popupAddForm = document.querySelector('.popup__container_add');
const popupImage = document.querySelector('.popup__image');
const popupPhotoImageDescription = document.querySelector('.popup__description');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__avatar');
const inputName = document.querySelector('.popup__input-name');
const inputDescription = document.querySelector('.popup__input-description');
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__input_type_error'
}

fetch('https://mesto.nomoreparties.co/v1/cohort-52/users/me', {
  headers: {
    authorization: '97978610-38d0-466f-b3ad-55157d97440d'
  }
})
  .then(res => res.json())
  .then((result) => {
    userName.textContent = result.name;
    userDescription.textContent = result.about;
    userAvatar.src = result.avatar;
  });

function renderServerCards() {
  fetch('https://mesto.nomoreparties.co/v1/cohort-52/cards', {
    headers: {
      authorization: '97978610-38d0-466f-b3ad-55157d97440d'
    }
  })
    .then(res => res.json())
    .then((result) => {
      cardList.renderItems(result.reverse());
    });
}
renderServerCards();

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
  fetch('https://mesto.nomoreparties.co/v1/cohort-52/cards', {
    method: 'POST',
    headers: {
      authorization: '97978610-38d0-466f-b3ad-55157d97440d',
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
