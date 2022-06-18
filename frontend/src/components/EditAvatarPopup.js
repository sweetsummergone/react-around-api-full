import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
    const avatarUrlField = React.useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          url: avatarUrlField.current.value
        });
    } 

    return (
        <PopupWithForm name="avatar" title="Change profile picture" buttonText="Save" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input
                ref={avatarUrlField}
                name="url"
                className="modal__input modal__input_type_url"
                id="url-photo-input"
                type="url"
                placeholder="Image URL"
                required
            />
            <span className="modal__input-error url-photo-input-error"></span>
          </PopupWithForm>
    )
}