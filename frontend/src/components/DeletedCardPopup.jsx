import PopupWithForm from './PopupWithForm';
import React from 'react';
export default function DeletedCardPopup(props) {
    const { isOpen, onClose, onDeletePlace, deleteCard } = props;

    function handleSubmit(e) {
        e.preventDefault();

        onDeletePlace(deleteCard);
    }

    return (

        <PopupWithForm
            name='notification'
            title='Вы уверены?'
            textBtn='Да'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        </PopupWithForm>
    );
}