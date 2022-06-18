import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState("");
    const [whois, setWhois] = React.useState("");
    
    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeAbout = (e) => {
        setWhois(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onUpdateUser({
            name: name,
            about: whois
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setWhois(currentUser.about);
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose} title="Edit profile" name="edit" buttonText="Save">
            <input
            name="name"
            className="modal__input modal__input_type_name"
            id="name-input"
            type="text"
            placeholder="Name"
            required minLength="2" maxLength="40"
            value={name}
            onChange={handleChangeName}
            />
            <span className="modal__input-error name-input-error" ></span>
            <input
            name="whois"
            className="modal__input modal__input_type_whois"
            id="whois-input"
            type="text"
            placeholder="Activity"
            required minLength="2" maxLength="200"
            value={whois}
            onChange={handleChangeAbout}
            />
            <span className="modal__input-error whois-input-error" ></span>
        </PopupWithForm>
    )
}