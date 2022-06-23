const editProfile = document.querySelector('.profile__edit-button');
const addCard = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPhoto = document.querySelector('.popup_photo');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupAddSubmit = document.querySelector('.popup__add-button');
const popupCloseButtonAdd = document.querySelector('.popup__close-button_add');
const popupCloseButtonPhoto = document.querySelector('.popup__close-button_photo');
const photoGrid = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('#item__template').content;
const popupSaveSubmit = document.querySelector('.popup__save-button');
const popupPhotoImage = document.querySelector('.popup__image');
const popupPhotoDescription = document.querySelector('.popup__description');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const inputAddName = document.querySelector('.popup__add-name');
const inputAddLink = document.querySelector('.popup__add-link');
const inputName = document.querySelector('.popup__input-name');
const inputDescription = document.querySelector('.popup__input-description');

//POPUP Photo


// RENDER new

const renderItem = (name, img) => {
  const newElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const itemImg = newElement.querySelector('.photo-grid__item-img');
  const itemName = newElement.querySelector('.photo-grid__item-name');
  let likeButton = newElement.querySelector('.photo-grid__item-btn');
  let deleteButton = newElement.querySelector('.photo-grid__delete-btn');
  itemImg.src = img;
  itemName.innerText = name;

  itemImg.addEventListener('click', (e) => {
    popupPhotoImage.src = e.target.src;
    popupPhotoDescription.innerText = itemName.innerText;
    popupPhoto.classList.add('popup_opened');
    popupCloseButtonPhoto.addEventListener('click', function() {
      popupPhoto.classList.remove('popup_opened');
    })
  });

  deleteButton.addEventListener('click', () => {
    newElement.remove();
  });

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('photo-grid__item-btn_liked');
  });
  photoGrid.prepend(newElement);
}

// INITIAL render

initialCards.forEach(item => renderItem(item.name, item.link));

// EDIT button

editProfile.addEventListener('click', function() {
  popupEdit.classList.add('popup_opened');
  inputName.textContent = userName.textContent;
  inputDescription.textContent = userDescription.textContent;
})

popupCloseButton.addEventListener('click', function() {
  popupEdit.classList.remove('popup_opened');
})

popupSaveSubmit.addEventListener('click', function(evt) {
  evt.preventDefault();
  userName.textContent = inputName.textContent;
  userDescription.textContent = inputDescription.textContent;
  popupEdit.classList.remove('popup_opened');
})

// ADD button

addCard.addEventListener('click', function() {
  popupAdd.classList.add('popup_opened');
})

popupCloseButtonAdd.addEventListener('click', function() {
  popupAdd.classList.remove('popup_opened');
})

popupAddSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  renderItem(inputAddName.value,inputAddLink.value);
  popupAdd.classList.remove('popup_opened');
  inputAddName.value = '';
  inputAddLink.value = '';
})


