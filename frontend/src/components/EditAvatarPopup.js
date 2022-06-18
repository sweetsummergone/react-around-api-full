import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const avatarUrlField = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      url: avatarUrlField.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Change profile picture"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarUrlField}
        name="url"
        className="modal__input modal__input_type_url"
        id="url-photo-input"
        type="url"
        placeholder="Image URL"
        required
      />
      <span className="modal__input-error url-photo-input-error" />
    </PopupWithForm>
  );
}
