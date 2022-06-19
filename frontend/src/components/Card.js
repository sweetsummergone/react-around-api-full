import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((user) => user === currentUser._id);
  const cardLikeButtonClassName = `${
    isLiked ? "likes__like likes__like_liked" : "likes__like"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id, card.owner);
  }

  return (
    <li className="cards__card">
      {isOwn && <button
        type="button"
        className="cards__delete"
        onClick={handleDeleteClick}
      />}
      <img
        src={card.link}
        alt={card.name}
        className="cards__image"
        onClick={handleClick}
      />
      <div className="cards__footer">
        <h2 className="cards__name">{card.name}</h2>
        <div className="likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <h2 className="likes__count">{card.likes.length}</h2>
        </div>
      </div>
    </li>
  );
}

export default Card;
