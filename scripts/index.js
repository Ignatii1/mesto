const edit = document.querySelector('.profile__edit-button');
const add = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupAddSubmit = document.querySelector('.popup__add-button');
const popupCloseButtonAdd = document.querySelector('.popup__close-button_add');
const photoGrid = document.querySelector('.photo-grid');
const itemTemplate = document.querySelector('.item__template').content;
const popupSaveSubmit = document.querySelector('.popup__save-button');
let userName = document.querySelector('.profile__name');
let userDescription = document.querySelector('.profile__description');
let addName = document.querySelector('.popup__add-name');
let addLink = document.querySelector('.popup__add-link');
let inputName = document.querySelector('.popup__input-name');
let inputDescription = document.querySelector('.popup__input-description');
let formElement = document.querySelector('.popup__container');

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

// RENDER new

const renderItem = (name, img) => {
  const newElement = itemTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const itemImg = newElement.querySelector('.photo-grid__item-img');
  const itemName = newElement.querySelector('.photo-grid__item-name');
  const likeButton = document.querySelector('.photo-grid__item-btn');
  itemImg.src = img;
  itemName.innerText = name;
  photoGrid.prepend(newElement);
  likeButton.addEventListener('click', function() {
  // likeButton.classList.toggle('.photo-grid__item-btn_liked'); ДОБАВИТЬ СТИЛИ ДЛЯ ЧЕРНОГО СЕРДЦА ПРИ ЛАЙКЕ
})
}

// INITIAL render

initialCards.forEach(item => renderItem(item.name, item.link));

// EDIT button

edit.addEventListener('click', function() {
  popupEdit.classList.add('popup_opened');
  inputName.value = userName.innerText;
  inputDescription.value = userDescription.innerText;
})

popupCloseButton.addEventListener('click', function() {
  popupEdit.classList.remove('popup_opened');
})

popupSaveSubmit.addEventListener('click', function(evt) {
  evt.preventDefault();
  userName.innerText = inputName.value;
  userDescription.innerText = inputDescription.value;
  popupEdit.classList.remove('popup_opened');
})

// ADD button

add.addEventListener('click', function() {
  popupAdd.classList.add('popup_opened');
})

popupCloseButtonAdd.addEventListener('click', function() {
  popupAdd.classList.remove('popup_opened');
})

popupAddSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(addName.value,addLink.value);
  renderItem(addName.value,addLink.value);
  popupAdd.classList.remove('popup_opened');
  addName.value = '';
  addLink.value = '';
})

// LIKE 


