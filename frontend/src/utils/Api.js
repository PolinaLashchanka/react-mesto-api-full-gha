class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
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
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(`cards`, {
      headers: this._headers,
    });
  }

  editProfile(data) {
    return this._request(`users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  addNewCard(data) {
    return this._request(`cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  deleteCard(id) {
    return this._request(`cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(id, isLiked) {
    return this._request(`cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    });
  }

  getLikesCount(id) {
    return this._request(`cards/${id}/likes`, {
      method: "PATCH",
      headers: this._headers,
    });
  }

  editAvatar(data) {
    return this._request(`users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }
}

const token = localStorage.getItem('jwt');

const api = new Api({
  url: "http://api.miasto-pl.students.nomoreparties.co",
  headers: {
    Authorization: `Bearer ${token}`,
    "content-type": "application/json",
  },
});

export default api;
