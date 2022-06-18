import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isUserDataLoading, setIsUserDataLoding] = React.useState(true);
  
  const [cards, setCards] = React.useState([]);
  const [isCardsLoading, setIsCardsLoading] = React.useState(true);
  
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

  function handleUpdateUser({name, about}) {
    api.updateUser({
      name: name,
      whois: about
    })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch(err => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar.url)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      });
  }

  
  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    
    // Send a request to the API and getting the updated card data
    if (isLiked) {
      api.removeLike(card._id)
          .then(newCard => {
              setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
          })
          .catch(err => {
              console.error(err);
          });
    } else {
      api.addLike(card._id)
          .then(newCard => {
              setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
          })
          .catch(err => {
              console.error(err);
          });
    } 
  } 

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
        .then(() => {
            setCards(cards.filter(card => card._id !== cardId));
        })
        .catch(err => {
            console.error(err);
        });
  }

  function handleAddPlaceSubmit({title, url}) {
    api.saveCard({title, url})
      .then(res => {
        setCards([res, ...cards]); 
        closeAllPopups();
      })
      .catch(err => {
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
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleEscape)

    api.getUser()
        .then((res) => {
            setCurrentUser(res);
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            setIsUserDataLoding(false);
        });
    
    api.getCards()
        .then(res => {
            setCards(res);
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            setIsCardsLoading(false);
        });

    return (() => {
      document.removeEventListener("keydown", handleEscape)
    })
  }, []);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
          {isCardsLoading || isUserDataLoading ?  <></> : (<EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>)}
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
          <ImagePopup onClose={closeAllPopups} card={selectedCard}/>

          <Header />
          <Main isDataLoading={isUserDataLoading || isCardsLoading} 
                onEditProfileClick={handleEditProfileClick} 
                onAddPlaceClick={handleAddPlaceClick} 
                onEditAvatarClick={handleEditAvatarClick} 
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards} />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
