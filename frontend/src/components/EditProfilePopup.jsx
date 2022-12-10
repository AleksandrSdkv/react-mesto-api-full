import { useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';
export default function EditProfilePopup(props) {
    const { isOpen, onClose, onUpdateUser } = props

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,

        });
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            textBtn='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input value={name || ''} onChange={handleChangeName} id="name-input" className="form__input form__input_type_name" type="text" name="name" placeholder="Имя пользователя" required minLength="2" maxLength="40" />
            <span className="name-input-error form__error-message"></span>
            <input value={description || ''} onChange={handleChangeDescription} id="about-input" className="form__input form__input_type_about" type="text" name="about" placeholder="Описание" required minLength="2" maxLength="200" />
            <span className="about-input-error form__error-message"></span>
        </PopupWithForm>
    )
}
