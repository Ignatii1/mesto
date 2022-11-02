import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import initialCards from './initialCards.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const popupEditForm = document.querySelector('.popup__container');
const popupAddForm = document.querySelector('.popup__container_add');
const popupImage = document.querySelector('.popup__image');
const popupPhotoImageDescription = document.querySelector('.popup__description');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
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

function handleCardClick(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupPhotoImageDescription.innerText = name;
  popupWithImage.open(link, name);
}

function createCard(item) {
  const card = new Card(item, '#item__template', handleCardClick);
  return card.generateCard();
}

function renderer(item) {
  const card = createCard(item);
  cardList.addItem(card);
}

const userInfo = new UserInfo('.profile__name', '.profile__description');

const cardList = new Section({ items: initialCards, renderer }, '.photo-grid');
cardList.renderItems();

const popupEditProfile = new PopupWithForm('.popup_edit', ({ name, description }) => {
  userInfo.setUserInfo({ name, description });
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_add', (inputs) => {
  cardList.addItem(createCard(inputs));
});
popupAddCard.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_photo');
popupWithImage.setEventListeners();

// EVENT LISTENERS ADD

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

// FORMS validation

const cardFormValidator = new FormValidator(validationConfig, popupAddForm);
const profileFormValidator = new FormValidator(validationConfig, popupEditForm);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
