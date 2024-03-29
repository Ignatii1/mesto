import {
  profileEditButton,
  cardAddButton,
  popupEditForm,
  popupAvatarForm,
  popupAddForm,
  popupImage,
  popupPhotoImageDescription,
  userAvatar,
  validationConfig,
} from "../utils/constants.js";

import "../pages/index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

let userId;
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "5669c063-4c85-4d28-8ba4-8813e38df69e",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getCards()])
  .then((res) => {
    const [profileInfo, cardsArray] = res;
    userInfo.setUserInfo(profileInfo);
    userId = userInfo.getId();
    console.log(userId);
    cardList.renderItems(cardsArray.reverse());
  })
  .catch((err) => console.log(err));

// HANDLERS

function handleDeleteCard(cardId, card) {
  popupConfirmation.open(cardId, card);
}

function handleConfirmSubmit() {
  popupConfirmation.renderLoading(true);
  api
    .deleteCard(this.cardId)
    .then(() => {
      popupConfirmation.card.remove();
      popupConfirmation.card = null;
      popupConfirmation.close();
    })
    .finally(() => popupConfirmation.renderLoading(false));
}

function handleEditProfile({ name, description }) {
  popupEditProfile.renderLoading(true);
  api
    .updateProfile({ name, description })
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupEditProfile.renderLoading(false));
}

function handleAddSubmit(inputs) {
  popupAddCard.renderLoading(true, "Создание...");
  api
    .postCard(inputs)
    .then((res) => {
      cardList.addItem(res);
      popupAddCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAddCard.renderLoading(false));
}

function handleUpdateAvatar({ avatar }) {
  popupAvatarUpdate.renderLoading(true);
  api
    .updateAvatar(avatar)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatarUpdate.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAvatarUpdate.renderLoading(false));
}

function handleCardClick(link, name) {
  popupWithImage.open(link, name);
}

function handleLikeCard(card) {
  if (card.isLiked()) {
    api.removeLike(card._cardId).then((res) => {
      card.setLikeCount(res.likes.length);
      card.setLikeData(res.likes);
      card.removeLike();
    });
  } else {
    api.addLike(card._cardId).then((res) => {
      card.setLikeCount(res.likes.length);
      card.setLikeData(res.likes);
      card.addLike();
    });
  }
}

function renderer(item) {
  const card = new Card(
    item,
    "#item__template",
    handleCardClick,
    handleDeleteCard,
    handleLikeCard,
    userId
  );
  return card.generateCard();
}

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__description",
  ".profile__avatar"
);

const cardList = new Section({ renderer }, ".photo-grid");

// POPUPS

const popupAddCard = new PopupWithForm(".popup_add", handleAddSubmit);
const popupWithImage = new PopupWithImage(".popup_photo");
const popupEditProfile = new PopupWithForm(".popup_edit", handleEditProfile);
const popupConfirmation = new PopupWithConfirmation(
  ".popup_confirmation",
  handleConfirmSubmit
);
const popupAvatarUpdate = new PopupWithForm(
  ".popup_updateAvatar",
  handleUpdateAvatar
);

// FORMS validation

const cardFormValidator = new FormValidator(validationConfig, popupAddForm);
const profileFormValidator = new FormValidator(validationConfig, popupEditForm);
const avatarFormValidator = new FormValidator(
  validationConfig,
  popupAvatarForm
);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Event Listeners

popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();
popupConfirmation.setEventListeners();
popupAvatarUpdate.setEventListeners();

userAvatar.addEventListener("click", function () {
  avatarFormValidator.resetValidation();
  popupAvatarUpdate.open();
});

cardAddButton.addEventListener("click", function () {
  cardFormValidator.resetValidation();
  popupAddCard.open();
});

profileEditButton.addEventListener("click", function () {
  const profileInputValues = userInfo.getUserInfo();
  popupEditProfile.setInputValues(profileInputValues);
  profileFormValidator.resetValidation();
  popupEditProfile.open();
});
