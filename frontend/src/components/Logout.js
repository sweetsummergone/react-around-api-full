import React, { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Logout() {
  const [dots, setDots] = useState(".");

  const { handleUserLogout } = useContext(CurrentUserContext);

  useEffect(() => {
    setTimeout(() => {
      handleUserLogout();
    }, 3000);
  }, []);

  useEffect(() => {
    let intervalTick = 0;
    const animateDots = setInterval(() => {
      intervalTick += 1;
      setDots(".".repeat(dots.length + 1));
      if (intervalTick === 1) clearInterval(animateDots);
    }, 1000);
  }, [dots]);

  return (
    <div className="page">
      <h2 className="page__title">Logging out{dots}</h2>
    </div>
  );
}

export default Logout;
