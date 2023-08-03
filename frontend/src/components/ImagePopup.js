import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import usePopupClose from "../hooks/usePopupClose";

function ImagePopup({ card }) {
  const classPopupOpened = "popup_opened";
  const { closeAllPopups } = useContext(AppContext);
  usePopupClose(card?.link, closeAllPopups);

  return (
    <div className={`popup popup_open-image ${card ? classPopupOpened : ""}`}>
      <div className="popup__image-container">
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <h2 className="popup__caption">{card?.name}</h2>
        <button
          className="button popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={closeAllPopups}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
