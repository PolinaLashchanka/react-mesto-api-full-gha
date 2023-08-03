import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const linkRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: linkRef.current.value,
    });
  }
  useEffect(() => {
    linkRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="input-avatar-link"
        className="form__item form__item_user_avatar"
        type="url"
        ref={linkRef}
        name="avatarLink"
        placeholder="Ссылка на аватар"
        required
      />
      <span id="input-avatar-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
