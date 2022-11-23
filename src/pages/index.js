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
    console.log(res);
    const [profileInfo, cardsArray] = res;
    userName.textContent = profileInfo.name;
    userDescription.textContent = profileInfo.about;
    userAvatar.src = profileInfo.avatar;
    userId = profileInfo._id;

    console.log(cardsArray);
    cardList.renderItems(cardsArray.reverse());
  })
  .catch(err => console.log(err));

// HANDLERS

function handleDeleteCard(card) {
  popupConfirmation.open(card);
}

function handleConfirmSubmit() {
  console.log(this._card);
}

function handleEditProfile({ name, description }) {
  api.updateProfile({name, description})
    .then(res => {
      userInfo.setUserInfo(res)
    });
}

function handleAddSubmit(inputs) {
  api.postCard(inputs)
    .then(res => {
      renderer(res);
    })
}

function handleCardClick(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupPhotoImageDescription.innerText = name;
  popupWithImage.open(link, name);
}

function renderer(item) {
  const card = createCard(item);
  cardList.addItem(card);
}

function createCard(item) {
  const card = new Card(item, '#item__template', handleCardClick, handleDeleteCard, userId);
  return card.generateCard();
}

const userInfo = new UserInfo('.profile__name', '.profile__description');

const cardList = new Section({ renderer }, '.photo-grid');

// POPUPS

const popupEditProfile = new PopupWithForm('.popup_edit', handleEditProfile);

const popupAddCard = new PopupWithForm('.popup_add', handleAddSubmit);

const popupWithImage = new PopupWithImage('.popup_photo');

const popupConfirmation = new PopupWithConfirmation('.popup_confirmation', handleConfirmSubmit);

// FORMS validation

const cardFormValidator = new FormValidator(validationConfig, popupAddForm);
const profileFormValidator = new FormValidator(validationConfig, popupEditForm);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

// Event Listeners

popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();
popupConfirmation.setEventListeners();

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
