import React, { useState } from "react";
import Hamburger from "../images/Hamburger.svg";
import Close from "../images/plus.svg";
import logo from "../images/logo.svg";
import useWindowDimensions from "../utils/hooks/useWindowDimensions";

import HeaderControl from "./HeaderControl";

const WIDTH_MOBILE = 879;

const headerButtonsConfig = {
  register: {
    direction: "/signin",
    textContent: "Log In",
  },
  login: {
    direction: "/signup",
    textContent: "Sign Up",
  },
  signout: {
    direction: "/signout",
    textContent: "Log Out",
  },
};

function Header({ headerButtonType }) {
  const [isBurgerToggled, setIsBurgerToggled] = useState(false);
  const { width } = useWindowDimensions();

  const headerButtonConfig = headerButtonsConfig[headerButtonType];

  const toggleHamburger = () => {
    setIsBurgerToggled(!isBurgerToggled);
  };

  return (
    <>
      {headerButtonType === "signout" &&
        isBurgerToggled &&
        width <= WIDTH_MOBILE && (
          <HeaderControl headerButton={headerButtonConfig} />
        )}
      <header className="header">
        <img
          src={logo}
          alt="Logotype of website signed 'Around The U.S.'"
          className="header__logo"
        />

        {headerButtonConfig.direction === "/signout" && width <= 879 ? (
          <img
            className={
              isBurgerToggled
                ? "header__button header__button_rotated"
                : "header__button"
            }
            src={isBurgerToggled ? Close : Hamburger}
            alt="hamburger-menu button"
            onClick={toggleHamburger}
          />
        ) : (
          <HeaderControl headerButton={headerButtonConfig} />
        )}
      </header>
    </>
  );
}

export default Header;
