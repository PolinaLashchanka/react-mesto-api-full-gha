function checkResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject("Что-то пошло не так! Попробуйте еще раз.");
}

export default checkResponse;
