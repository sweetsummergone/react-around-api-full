import React, { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import editavatar from "../images/editavatar.svg";
import spinner from "../images/spinner.svg";

function Main({
  cards,
  isDataLoading,
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  if (isDataLoading) {
    return (
      <div className="loading">
        <img src={spinner} alt="Loading spinner" className="loading__spinner" />
      </div>
    );
  }
  return (
    <main className="content">
      <section className="profile">
        <div className="photo" onClick={onEditAvatarClick}>
          <img
            src={currentUser.avatar}
            alt="You are beautiful"
            className="photo__image"
          />
          <img
            src={editavatar}
            alt="Edit icon"
            className="photo__edit hidden"
          />
        </div>
        <div className="info">
          <div className="info__container">
            <h1 className="info__name">{currentUser.name}</h1>
            <button
              type="button"
              className="info__button-edit"
              onClick={onEditProfileClick}
            />
          </div>
          <p className="info__whois">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__button-add"
          onClick={onAddPlaceClick}
        />
      </section>
      <ul className="cards">
        {cards.map((card, index) => (
          <Card
            card={card}
            key={index}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
