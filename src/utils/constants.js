const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const popupEditForm = document.querySelector('.popup__container');
const popupAddForm = document.querySelector('.popup__container_add');
const popupAvatarForm = document.querySelector('.popup__container-avatar');
const popupImage = document.querySelector('.popup__image');
const popupPhotoImageDescription = document.querySelector('.popup__description');
const userAvatar = document.querySelector('.profile__avatar-container');

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__input_type_error'
}

export {
  profileEditButton,
  cardAddButton,
  popupEditForm,
  popupAddForm,
  popupAvatarForm,
  popupImage,
  popupPhotoImageDescription,
  userAvatar,
  validationConfig
}
