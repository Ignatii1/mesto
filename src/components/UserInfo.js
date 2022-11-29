export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector, avatarSelector) {
    this._nameSelector = userNameSelector;
    this._descriptionSelector = userDescriptionSelector;
    this._avatarSelector = avatarSelector;
    this._name = document.querySelector(this._nameSelector);
    this._description = document.querySelector(this._descriptionSelector);
    this._avatar = document.querySelector(this._avatarSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name.textContent;
    userInfo.description = this._description.textContent;
    return userInfo;
  }

  getId() {
    return this._id;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._description.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}
