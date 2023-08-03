import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name ?? "");
    setDescription(currentUser.about ?? "");
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="input-name"
        className="form__item form__item_user_name"
        type="text"
        value={name}
        onChange={handleNameChange}
        minLength="2"
        maxLength="40"
        name="userName"
        placeholder="Имя"
        required
      />
      <span id="input-name-error" className="popup__error"></span>
      <input
        id="input-description"
        className="form__item form__item_user_description"
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        minLength="2"
        maxLength="200"
        name="userDescription"
        placeholder="О себе"
        required
      />
      <span id="input-description-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
