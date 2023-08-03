import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.owner === currentUser._id;
  const isLiked = props.likes?.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `button photo-grid__heart-button ${
    isLiked && "photo-grid__heart-button_active"
  }`;
  function handleClick() {
    props.onCardClick(props);
  }

  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleDeleteClick() {
    props.onDeleteClick(props);
  }

  return (
    <div className="photo-grid__card">
      <img
        className="photo-grid__image"
        src={props.link}
        alt="#"
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="button photo-grid__card_delete-button"
          type="button"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="photo-grid__caption">
        <h2 className="photo-grid__text">{props.name}</h2>
        <div className="photo-grid__heart-section">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          ></button>
          <h5 className="photo-grid__heart-count">{props.likes.length}</h5>
        </div>
      </div>
    </div>
  );
}

export default Card;
