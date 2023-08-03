import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onSubmit }) {
  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonName="Да"
      isOpen={isOpen}
      onSubmit={onSubmit}
    />
  );
}

export default DeleteCardPopup;
