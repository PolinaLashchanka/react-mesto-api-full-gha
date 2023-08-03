import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  cards,
  onDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar">
            <img
              className="profile__avatar-image"
              src={currentUser.avatar}
              alt="фотография пользователя"
            />
            <div className="profile__avatar-edit">
              <button
                className="button profile__avatar-edit-button"
                type="button"
                aria-label="Редактировать"
                onClick={onEditAvatar}
              ></button>
            </div>
          </div>
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button
            className="button profile__edit-button"
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="button profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="photo-grid">
        {cards.map((card) => (
          <Card
            key={card._id}
            {...card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
