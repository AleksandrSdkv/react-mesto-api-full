import { Link } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';


function Register({ onRegister }) {
    const [stateInput, setStateInput] = useState({
        password: '',
        email: '',
    });



    function handleChangeRegister(e) {
        const { name, value } = e.target;

        setStateInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(e) {

        e.preventDefault();
        const { password, email } = stateInput;
        if (!password || !email) return;

        onRegister(password, email)
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="form_type_register" >
                <h2 className="form__title_type_dark">Регистрация</h2>
                <fieldset className="form__group">
                    <input onChange={handleChangeRegister} id="email-input" className="form__input form__input_type_dark" type="email" name="email" placeholder="Email" required minLength="2" maxLength="40" />
                    <span className="name-input-error form__error-message"></span>
                    <input onChange={handleChangeRegister} id="about-input" className="form__input form__input_type_dark" type="password" name="password" placeholder="Пароль" required minLength="2" maxLength="200" />
                    <span className="name-input-error form__error-message"></span>
                    <button className="form__bottom-submit_type_dark" type="submit">Зарегистрироваться</button>
                    <Link to="/sign-in" className="form__link-to-sing">Уже зарегистрированы? Войти</Link>
                </fieldset>
            </form>
        </>
    )
}

export default Register;