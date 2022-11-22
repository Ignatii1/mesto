export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(res => res.json())
      .then((result) => {
        return result;
      })
      .catch(err => console.log(err));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
    headers: this._headers
  })
    .then(res => res.json())
    .then((result) => {
      cardList.renderItems(result.reverse());
    });
  }

  deleteCard() {

  }

}
