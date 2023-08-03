import React from "react";
import usePopupClose from "../hooks/usePopupClose";

function InfoTooltip({ isOpen, isClose, message, infoPic }) {
  const classPopupOpened = "popup_opened";
  usePopupClose(isOpen, isClose);

  return (
    <div className={`popup ${isOpen ? classPopupOpened : ""}`}>
      <div className="popup__container">
        <img src={infoPic} alt="infoPic" className="popup__info-image" />
        <h2 className="popup__message">{message}</h2>
        <button
          className="button popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={isClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
