import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup({ isOpen, onAddPlace }) {
  const { values, handleChange, setValues } = useForm({
    cardName: "",
    cardLink: "",
  });

  useEffect(() => {
    setValues({
      cardName: "",
      cardLink: "",
    });
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.cardName,
      link: values.cardLink,
    });
  }
  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      buttonName="Создать"
      onSubmit={handleSubmit}
    >
      <input
        id="input-card-name"
        className="form__item form__item_card_name"
        type="text"
        value={values.cardName}
        onChange={handleChange}
        minLength="2"
        maxLength="30"
        name="cardName"
        placeholder="Название"
        required
      />
      <span id="input-card-name-error" className="popup__error"></span>
      <input
        id="input-card-link"
        className="form__item form__item_card_image"
        type="url"
        value={values.cardLink}
        onChange={handleChange}
        name="cardLink"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="input-card-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
