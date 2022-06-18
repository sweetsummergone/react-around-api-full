import React, { useContext, useState } from "react";
import Header from "./Header";
import * as auth from "../utils/auth";

import CurrentUserContext from "../contexts/CurrentUserContext";

function Login() {
  const [tempUser, setTempUser] = useState({
    email: "",
    password: "",
  });
  const [errorText, setErrorText] = useState("");
  const { handleUserLogin } = useContext(CurrentUserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser({ ...tempUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .authorize(tempUser.email, tempUser.password)
      .then((res) => {
        if (!res.message && !res.error) {
          handleUserLogin(res.token);
        } else {
          setErrorText(res.message ? res.message : res.error);
          throw new Error(res.message || res.error);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="page">
      <Header headerButtonType="login" />
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Log in</h2>
        <input
          className="form__input form__input_email"
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />
        <input
          className="form__input form__input_password"
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <span className="form__error">{errorText}</span>
        <button className="form__btn_submit" type="submit">
          Log in
        </button>
        <span className="form__tooltip">
          Not a member yet? Sign up <a href="/signup">here!</a>
        </span>
      </form>
    </div>
  );
}

export default Login;
