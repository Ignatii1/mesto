import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import initialCards from './initialCards.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPhoto = document.querySelector('.popup_photo');
const popupCloseButtonEdit = document.querySelector('.popup__close-button_edit');
const popupEditForm = document.querySelector('.popup__container');
const popupAddForm = document.querySelector('.popup__container_add');
const popupCloseButtonAdd = document.querySelector('.popup__close-button_add');
const popupCloseButtonPhoto = document.querySelector('.popup__close-button_photo');
const photoGrid = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('#item__template').content;
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const inputAddName = document.querySelector('.popup__add-name');
const inputAddLink = document.querySelector('.popup__add-link');
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

// FORMS validation

const cardFormValidator = new FormValidator(validationConfig, popupAddForm);
const profileFormValidator = new FormValidator(validationConfig, popupEditForm);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

//POPUP open and close
const closeOnEsc = (e) => {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc);
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEsc);
}

function handlePopupOpen() {
  const popupImage = document.querySelector('.popup__image');
  const popupPhotoImageDescription = document.querySelector('.popup__description');

  popupImage.src = this._link;
  popupImage.alt = this._name;
  popupPhotoImageDescription.innerText = this._name;
  openPopup(popupPhoto);
}

// INITIAL render

const createCard = (cardData) => {
  return new Card(cardData, '#item__template', handlePopupOpen).generateCard();
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  photoGrid.prepend(card);
});

// OVERLAY close on click

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closePopup(popup);
    }
  });
});

// EDIT button

function editFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userDescription.textContent = inputDescription.value;
  closePopup(popupEdit);
}

profileEditButton.addEventListener('click', function() {
  inputName.value = userName.textContent;
  inputDescription.value = userDescription.textContent;
  openPopup(popupEdit);
  profileFormValidator.validateOnOpen(popupEditForm);
})

popupCloseButtonEdit.addEventListener('click', function() {
  closePopup(popupEdit);
})

popupEditForm.addEventListener('submit', editFormSubmit);

// ADD button

cardAddButton.addEventListener('click', function() {
  openPopup(popupAdd);
  cardFormValidator.validateOnOpen(popupAddForm);
})

popupCloseButtonAdd.addEventListener('click', function() {
  closePopup(popupAdd);
})

popupAddForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const newCard = {
    name: inputAddName.value,
    link: inputAddLink.value
  };
  photoGrid.prepend(createCard(newCard));
  closePopup(popupAdd);
  popupAddForm.reset();
})

popupCloseButtonPhoto.addEventListener('click', () => {
  closePopup(popupPhoto);
});
