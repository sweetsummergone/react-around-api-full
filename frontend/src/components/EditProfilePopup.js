import React, { useEffect, useContext, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [whois, setWhois] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeAbout = (e) => {
    setWhois(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: whois,
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setWhois(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Edit profile"
      name="edit"
      buttonText="Save"
    >
      <input
        name="name"
        className="modal__input modal__input_type_name"
        id="name-input"
        type="text"
        placeholder="Name"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleChangeName}
      />
      <span className="modal__input-error name-input-error" />
      <input
        name="whois"
        className="modal__input modal__input_type_whois"
        id="whois-input"
        type="text"
        placeholder="Activity"
        required
        minLength="2"
        maxLength="200"
        value={whois}
        onChange={handleChangeAbout}
      />
      <span className="modal__input-error whois-input-error" />
    </PopupWithForm>
  );
}
