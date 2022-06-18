import { useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

function HeaderControl({ headerButton }) {
  const { isAuth, currentUser } = useContext(CurrentUserContext);

  return (
    <div
      className={
        headerButton.direction === "/signout"
          ? "header__control header__control_logout"
          : "header__control"
      }
    >
      {isAuth ? <p className="header__email">{currentUser.email}</p> : null}
      <Link style={{ textDecoration: "none" }} to={headerButton.direction}>
        <p
          className={
            headerButton.direction !== "/signout"
              ? "header__link"
              : "header__link header__link_logout"
          }
        >
          {headerButton.textContent}
        </p>
      </Link>
    </div>
  );
}

export default HeaderControl;
