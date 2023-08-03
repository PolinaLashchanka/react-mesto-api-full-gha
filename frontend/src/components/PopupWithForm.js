import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import usePopupClose from "../hooks/usePopupClose";

function PopupWithForm({
  isOpen,
  name,
  title,
  buttonName,
  children,
  onSubmit,
}) {
  const classPopupOpened = "popup_opened";
  const { isLoading, closeAllPopups } = useContext(AppContext);

  usePopupClose(isOpen, closeAllPopups);
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? classPopupOpened : ""}`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          id={name}
          className={`form popup__form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button className="button form__submit-button" type="submit">
            {(buttonName || "Сохранить") + (isLoading ? "..." : "")}
          </button>
        </form>
        <button
          className="button popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={closeAllPopups}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
