import React from 'react';
import { useContext } from 'react';
import overlayAvatar from '../image/VectorAvatar.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function Main(props) {
    const currentUserContext = useContext(CurrentUserContext);
    const { onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike, cards, onTrashClick } = props

    return (
        <main className="content">

            <section className="profile">
                <div className="profile__overlay" onClick={onEditAvatar}>
                    <img src={overlayAvatar} className="profile__avatar-eddit" alt="Карандашик" />
                </div>
                <img className="profile__avatar" src={currentUserContext.avatar} alt="Аватар" />

                <div className="profile__info">
                    <h1 className="profile__name">{currentUserContext.name}</h1>
                    <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                    <p className="profile__about">{currentUserContext.about}</p>
                </div>
                <button className="profile__place-button" id="add-button" type="button" onClick={onAddPlace}></button>
            </section>
            <section>
                <ul className="element-list" >
                    {cards.map(item => <Card key={item._id} card={item} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} onTrashClick={onTrashClick} />)}

                </ul>
            </section>

        </main>)
}
