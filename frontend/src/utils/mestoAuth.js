import checkResponse from "./checkResponse";

export const BASE_URL = "https://api.miasto-pl.students.nomoreparties.co";

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

export function register(password, email) {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  });
}

export const authorize = (password, email) => {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  });
};

export const checkToken = (token) => {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
