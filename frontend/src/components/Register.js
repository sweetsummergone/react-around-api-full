import React, { useState } from "react";
import Header from "./Header";
import * as auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import RegisterPopup from "./RegisterPopup";

function Register() {
  const [tempUser, setTempUser] = useState({
    email: "",
    password: "",
  });
  const [errorText, setErrorText] = useState("");
  const [isModalActive, setIsModalActive] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser({ ...tempUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .register(tempUser.email, tempUser.password)
      .then((res) => {
        if (!res.message && !res.error) {
          setSuccess(true);
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        } else {
          setErrorText(res.message || res.error);
          throw new Error(res.message || res.error);
        }
        setIsModalActive(true);
      })
      .catch((err) => console.error(err));
  };

  const onModalClose = () => {
    setIsModalActive(false);
  };

  return (
    <div className="page">
      <RegisterPopup
        onClose={onModalClose}
        isModalActive={isModalActive}
        success={success}
      />
      <Header headerButtonType="register" />
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Sign up</h2>
        <input
          className="form__input form__input_email"
          required
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />
        <input
          className="form__input form__input_password"
          required
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <span className="form__error">{errorText}</span>
        <button className="form__btn_submit" type="submit">
          Sign up
        </button>
        <span className="form__tooltip">
          Already a member? Log in <a href="/signin">here!</a>
        </span>
      </form>
    </div>
  );
}

export default Register;
