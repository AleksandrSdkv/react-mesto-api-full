import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

export default function Card(props) {
    const { card, onCardClick, onCardLike, onTrashClick, onCardDelete } = props;
    const currentUserContext = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUserContext._id;
    const cardDeleteButtonClassName = (
        `element__btn-remove ${isOwn ? 'element__btn-remove_visible' : ''}`
    );
    const isLiked = card.likes.some(i => i === currentUserContext._id);
    const cardLikeButtonClassName = (`element__like-button ${isLiked ? 'element__like-button_active' : ''}`
    );
    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }
    function handleDeleteClick() {
        onTrashClick(true);

        onCardDelete(card);
    }
    return (
        <li className="element">
            <button className={cardDeleteButtonClassName} type="button" onClick={() => handleDeleteClick()}></button>
            <div className="element__group"><img className="element__mask-group" alt={card.name} src={card.link} onClick={handleClick} /></div>
            <h2 className="element__place-name">{card.name}</h2>
            <div className="element__like">
                <button type="button" className={cardLikeButtonClassName} onClick={() => handleLikeClick()}></button>
                <div className="element__like-counter">{card.likes.length}</div>
            </div>
        </li>
    )
}
