import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import AddPlacePopup from "./AddPlacePopup";

function Content() {
  const  { currentUser, handleUserEdit } = useContext(CurrentUserContext);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  const [cards, setCards] = useState([]);
  const [isCardsLoading, setIsCardsLoading] = useState(true);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    api
      .updateUser({
        name: name,
        whois: about,
      })
      .then((res) => {
        handleUserEdit(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .updateAvatar(avatar.url)
      .then((res) => {
        handleUserEdit(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user === currentUser._id);

    // Send a request to the API and getting the updated card data
    if (isLiked) {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard
            )
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard
            )
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleCardDelete(cardId, owner) {
    api
      .deleteCard({id: cardId, ownerId: owner})
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAddPlaceSubmit({ title, url, id }) {
    api
      .saveCard({ title, url, id })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  useEffect(() => {
    function handleEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    api
      .getUser()
      .then((res) => {
        handleUserEdit(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsUserDataLoading(false);
      });
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsCardsLoading(false);
      });
  }, []);

  return (
    <div className="App">
        <div className="page">
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          {isCardsLoading || isUserDataLoading ? null : (
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
          )}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />

          <Header headerButtonType="signout" />
          <Main
            isDataLoading={isUserDataLoading || isCardsLoading}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
        </div>
    </div>
  );
}

export default Content;
