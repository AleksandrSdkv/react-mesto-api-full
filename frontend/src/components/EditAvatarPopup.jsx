import { useContext, useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';
export default function EditAvatarPopup(props) {
    const { isOpen, onClose, onUpdateAvatar } = props
    const currentUser = useContext(CurrentUserContext);

    const avatarRef = useRef(currentUser.avatar);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    useEffect(() => {
        avatarRef.current.value = ''
    }, [isOpen]);
    return (
        <PopupWithForm
            name='for-avatar'
            title='Обновить аватар'
            textBtn='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input ref={avatarRef} id="avatar-input" className="form__input form__input_type_about" type="url" name="avatar" placeholder="Ссылка на картинку" required />
            <span className="avatar-input-error form__error-message"></span>
        </PopupWithForm>
    )
}