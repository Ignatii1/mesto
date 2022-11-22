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

  setUserInfo({ name, description }) {


    // fetch('https://mesto.nomoreparties.co/v1/cohort-52/users/me', {
    //   method: 'PATCH',
    //   headers: {
    //     authorization: '97978610-38d0-466f-b3ad-55157d97440d',
    //     'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     name: name,
    //     about: description
    //   })
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     this._name.textContent = res.name;
    //     this._description.textContent = res.about;
    //   });
  }
}
