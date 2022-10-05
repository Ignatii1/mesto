import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupCloseButtonEdit = document.querySelector('.popup__close-button_edit');
const popupEditForm = document.querySelector('.popup__container');
const popupAddForm = document.querySelector('.popup__container_add');
const popupCloseButtonAdd = document.querySelector('.popup__close-button_add');
const popupCloseButtonPhoto = document.querySelector('.popup__close-button_photo');
const photoGrid = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('#item__template').content;
const cardTemplateSelector = cardTemplate.querySelector('.photo-grid__card');
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

// INITIAL render

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEsc);
}

const addCard = (cardData) => {
  const card = new Card(cardData, '#item__template', openPopup);
  renderCard(card.generateCard());
}

const renderCard = (card) => {
  photoGrid.prepend(card);
}

initialCards.forEach(addCard);

//POPUP open and close
const closeOnEsc = (e) => {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
    document.removeEventListener('keydown', closeOnEsc);
  }
}

popupCloseButtonPhoto.addEventListener('click', () => {
  const popupPhoto = document.querySelector('.popup_photo');
  closePopup(popupPhoto);
});

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc);
}

// RENDER new

const createCard = (name, img) => {
  const newCard = cardTemplateSelector.cloneNode(true);
  const cardImg = newCard.querySelector('.photo-grid__card-img');
  const cardName = newCard.querySelector('.photo-grid__card-name');
  const likeButton = newCard.querySelector('.photo-grid__card-btn');
  const deleteButton = newCard.querySelector('.photo-grid__delete-btn');
  cardImg.src = img;
  cardImg.alt = name;
  cardName.innerText = name;
  cardImg.addEventListener('click', () => {
    popupPhotoImage.src = cardImg.src;
    popupPhotoImage.alt = name;
    popupPhotoDescription.innerText = cardName.innerText;
    openPopup(popupPhoto);
  });
  deleteButton.addEventListener('click', () => {
    newCard.remove();
  });
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('photo-grid__card-btn_liked');
  });
  return newCard;
}

// EDIT button

profileEditButton.addEventListener('click', function() {
  openPopup(popupEdit);
  inputName.value = userName.textContent;
  inputDescription.value = userDescription.textContent;
  validateOnOpen(popupEditForm);
})

popupCloseButtonEdit.addEventListener('click', function() {
  closePopup(popupEdit);
})

popupEditForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userDescription.textContent = inputDescription.value;
  closePopup(popupEdit);
})

// ADD button

cardAddButton.addEventListener('click', function() {
  openPopup(popupAdd);
  validateOnOpen(popupAddForm);
})

popupCloseButtonAdd.addEventListener('click', function() {
  inputAddName.value = '';
  inputAddLink.value = '';
  closePopup(popupAdd);
})

popupAddForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const newEl = {
    name: inputAddName.value,
    link: inputAddLink.value
  };
  addCard(newEl);
  closePopup(popupAdd);
  inputAddName.value = '';
  inputAddLink.value = '';
})

// OVERLAY close on click

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closePopup(popup);
    }
  });
});

// FORMS validation

// enableValidation(validationConfig);
