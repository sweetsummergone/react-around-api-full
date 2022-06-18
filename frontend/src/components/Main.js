import React, { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import editavatar from "../images/editavatar.svg";
import spinner from "../images/spinner.svg";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    if (props.isDataLoading) {
        return (
            <div className="loading">
                <img src={spinner} alt="Loading spinner" className="loading__spinner" />
            </div>
        );
    }
    return (
        <main className="content">
            <section className="profile">
                <div className="photo" onClick={props.onEditAvatarClick}>
                    <img
                        src={currentUser.avatar}
                        alt="You are beautiful"
                        className="photo__image"
                    />
                    <img src={editavatar} alt="Edit icon" className="photo__edit hidden" />
                </div>
                <div className="info">
                    <div className="info__container">
                    <h1 className="info__name">{currentUser.name}</h1>
                    <button type="button" className="info__button-edit" onClick={props.onEditProfileClick}></button>
                    </div>
                    <p className="info__whois">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__button-add" onClick={props.onAddPlaceClick}></button>
            </section>
            <ul className="cards">
                {props.cards.map(card => (
                    <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                ))}
            </ul>
        </main>
    );
}

export default Main;