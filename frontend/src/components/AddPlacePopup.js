import PopupWithForm from "./PopupWithForm"
import React from "react";

export default function AddPlacePopup(props) {
    const nameField = React.useRef(null);
    const urlField = React.useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onAddPlace({
            title: nameField.current.value,
            url: urlField.current.value
        });
    } 

    return (
        <PopupWithForm name="add" title="New Place" buttonText="Save" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input
                ref={nameField}    
                name="title"
                className="modal__input modal__input_type_title"
                id="title-input"
                type="text"
                placeholder="Title"
                required minLength="1" maxLength="30"
            />
            <span className="modal__input-error title-input-error"></span>
            <input
                ref={urlField}    
                name="url"
                className="modal__input modal__input_type_url"
                id="url-image-input"
                type="url"
                placeholder="Image URL"
                required
            />
            <span className="modal__input-error url-image-input-error"></span>
          </PopupWithForm>
    )
}