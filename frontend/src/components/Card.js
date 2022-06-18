import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(user => user._id === currentUser._id);
    const cardDeleteButtonClassName = (
        `${isOwn ? 'cards__delete' : 'cards__delete hidden'}`
    );
    const cardLikeButtonClassName = `${isLiked ? 'likes__like likes__like_liked' : 'likes__like'}`; 

    function handleClick() {
        props.onCardClick(props.card);
    } 

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card._id);
    }

    return (
        <li className="cards__card">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <img src={props.card.link} alt={props.card.name} className="cards__image" onClick={handleClick}/>
            <div className="cards__footer">
                <h2 className="cards__name">{props.card.name}</h2>
                <div className="likes">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <h2 className="likes__count">{props.card.likes.length}</h2>
                </div> 
            </div>
        </li>
    );
}

export default Card;