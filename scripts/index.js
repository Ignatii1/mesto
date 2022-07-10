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
const popupPhotoImage = document.querySelector('.popup__image');
const popupPhotoDescription = document.querySelector('.popup__description');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const inputAddName = document.querySelector('.popup__add-name');
const inputAddLink = document.querySelector('.popup__add-link');
const inputName = document.querySelector('.popup__input-name');
const inputDescription = document.querySelector('.popup__input-description');

//POPUP open and close

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEsc);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc);
}


// RENDER new

const createCard = (name, img) => {
  const newCard = cardTemplate.querySelector('.photo-grid__card').cloneNode(true);
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

const addCard = ({name, link}) => {
  const card = createCard(name, link);
  renderCard(card);
}

const renderCard = (card) => {
  photoGrid.prepend(card);
}

// INITIAL render

initialCards.forEach(addCard);

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

// FORMS validation

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  })
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement)=>{
    return !inputElement.validity.valid;
  })
}

const enableButton = (buttonElement) => {

}

const toggleButtonState = (inputList, buttonElement) => {
  console.log('до условия');
  if (hasInvalidInput(inputList)) {
    console.log(buttonElement.validity.valid);
    buttonElement.setAttribute('disabled', 'disabled');
    buttonElement.classList.add('popup__save-button_disabled');
  } else {
    console.log('нет невалидных инпутов');
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__save-button_disabled');
  }
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const validateOnOpen = (form) => {
  const formInputs = Array.from(form.querySelectorAll('.popup__input'));
  const buttonElement = form.querySelector('.popup__submit');
  toggleButtonState(formInputs, buttonElement);
  formInputs.forEach((formInput) => {
    checkInputValidity(form, formInput);
  });
};

enableValidation();

// OVERLAY close on click

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closePopup(popup);
    }
  });
});

// Close on Esc

const closeOnEsc = (e) => {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
    document.removeEventListener('keydown', closeOnEsc);
  }
}

popupCloseButtonPhoto.addEventListener('click', function() {
  closePopup(popupPhoto);
});

