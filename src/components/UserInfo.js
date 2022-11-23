export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector) {
    this._nameSelector = userNameSelector;
    this._descriptionSelector = userDescriptionSelector;
    this._name = document.querySelector(this._nameSelector);
    this._description = document.querySelector(this._descriptionSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name.textContent;
    userInfo.description = this._description.textContent;
    return userInfo;
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._description.textContent = about;
  }
}
