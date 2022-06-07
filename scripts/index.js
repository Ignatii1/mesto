const edit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
let userName = document.querySelector('.profile__name');
let userDescription = document.querySelector('.profile__description');
let inputName = document.querySelector('.popup__input-name');
let inputDescription = document.querySelector('.popup__input-description');
let formElement = document.querySelector('.popup__container');

edit.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  inputName.value = userName.innerText;
  inputDescription.value = userDescription.innerText;
})

popupCloseButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
})

formElement.addEventListener('submit', function(evt) {
  evt.preventDefault();
  userName.innerText = inputName.value;
  userDescription.innerText = inputDescription.value;
  popup.classList.remove('popup_opened');
})
