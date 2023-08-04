import { BASE_URL } from "./mestoAuth";

class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getHeaders() {
    return {
      ...this._headers,
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, options) {
    return fetch(`${this._url}/${endpoint}`, options).then(this._checkError);
  }

  getUserInfo() {
    return this._request("users/me", {
      headers: this._getHeaders(),
    });
  }

  getInitialCards() {
    return this._request(`cards`, {
      headers: this._getHeaders(),
    });
  }

  editProfile(data) {
    return this._request(`users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  addNewCard(data) {
    return this._request(`cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    });
  }

  deleteCard(id) {
    return this._request(`cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    });
  }

  changeLikeCardStatus(id, isLiked) {
    return this._request(`cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._getHeaders(),
    });
  }

  getLikesCount(id) {
    return this._request(`cards/${id}/likes`, {
      method: "PATCH",
      headers: this._getHeaders(),
    });
  }

  editAvatar(data) {
    return this._request(`users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    });
  }
}

const api = new Api({
  url: BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

export default api;
