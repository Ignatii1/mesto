const edit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

console.log(edit);

edit.addEventListener('click', function() {
  popup.classList.remove('popup_hidden');
})

popupCloseButton.addEventListener('click', function() {
  popup.classList.add('popup_hidden');
})
