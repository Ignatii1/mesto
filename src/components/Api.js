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

  postCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(res => this._checkRes(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then(res => this._checkRes(res))
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    }).then(res => this._checkRes(res))
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers
    }).then(res => this._checkRes(res))
  }
}
