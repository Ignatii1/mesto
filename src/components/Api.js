export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkRes(res) {
    return res.ok ? res.json() : console.log(res.status);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(res => this._checkRes(res))
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(res => this._checkRes(res))
  }

  updateProfile({name, description}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description
      })
    }).then(res => this._checkRes(res));
  }
}
