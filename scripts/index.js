const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPhoto = document.querySelector('.popup_photo');
const popupCloseButton = document.querySelector('.popup__close-button');
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

const openPopup = (item) => {
  item.classList.add('popup_opened');
}

const closePopup = (item) => {
  item.classList.remove('popup_opened');
}


// RENDER new

const createCard = (name, img) => {
  const newElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const itemImg = newElement.querySelector('.photo-grid__item-img');
  const itemName = newElement.querySelector('.photo-grid__item-name');
  const likeButton = newElement.querySelector('.photo-grid__item-btn');
  const deleteButton = newElement.querySelector('.photo-grid__delete-btn');
  itemImg.src = img;
  itemImg.alt = name;
  itemName.innerText = name;
  itemImg.addEventListener('click', () => {
    popupPhotoImage.src = itemImg.src;
    popupPhotoImage.alt = name;
    popupPhotoDescription.innerText = itemName.innerText;
    openPopup(popupPhoto);
    popupCloseButtonPhoto.addEventListener('click', function() {
      closePopup(popupPhoto);
    })
  });
  deleteButton.addEventListener('click', () => {
    newElement.remove();
  });
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('photo-grid__item-btn_liked');
  });
  return newElement;
}

const addCard = ({name, link}) => {
  const card = createCard(name, link);
  renderItem(card);
}

const renderItem = (card) => {
  photoGrid.prepend(card);
}

// INITIAL render

initialCards.forEach(addCard);

// EDIT button

profileEditButton.addEventListener('click', function() {
  openPopup(popupEdit);
  inputName.value = userName.textContent;
  inputDescription.value = userDescription.textContent;
})

popupCloseButton.addEventListener('click', function() {
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
})

popupCloseButtonAdd.addEventListener('click', function() {
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

// FORMS

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
  const submitButton = formElement.querySelector('.popup__submit');
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  const submitButton = formElement.querySelector('.popup__submit');
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('popup__save-button_disabled');
  } else {
    hideInputError(formElement, inputElement);
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('popup__save-button_disabled');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

enableValidation();

