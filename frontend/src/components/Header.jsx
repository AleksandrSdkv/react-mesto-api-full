import { Link, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
function Header(props) {
    const { loggedIn, userData, loggedOut } = props
    const [hiddenMenuDataUser, sethiddenMenuDataUser] = useState(false);
    const [buttonMenuDataUser, setButtonMenuDataUser] = useState("header__button-close");
    const [isChangeMenu, setIsChangeMenu] = useState("header__nav_hidden");

    function changeButtonMenu() {
        sethiddenMenuDataUser(!hiddenMenuDataUser)
    }
    useEffect(() => {
        if (hiddenMenuDataUser) {
            setIsChangeMenu('header__nav')
            setButtonMenuDataUser("header__button-close");

        } else {
            setIsChangeMenu('header__nav_hidden')
            setButtonMenuDataUser("header__button_type_menu");

        }
    }, [hiddenMenuDataUser]);
    return (
        //Если пользователь авторизован выводит этот блок
        <>
            {loggedIn &&
                <>
                    <header className="header">
                        <div className="header__nav_logo">
                            <div className={"header__logo"}></div>
                            <button className={buttonMenuDataUser} onClick={changeButtonMenu} type="button" ></button>
                        </div>
                        <div className={isChangeMenu}>
                            <p className="header__nav-email">{userData.email}</p>
                            <button onClick={loggedOut} className="header__link_type_out" type="submit">Выйти</button>
                        </div>
                    </header >
                </>
            }

            <Switch>
                <Route path='/sign-in'>
                    <header className="header_type_sign">
                        <div className="header__logo"></div>
                        <Link to="/sign-up" className="header__link">Регистрация</Link>
                    </header >
                </Route>
                <Route path='/sign-up'>
                    <header className="header_type_sign">
                        <div className="header__logo"></div>
                        <Link to="/sign-in" className="header__link">Войти</Link>
                    </header >
                </Route>
            </Switch>
        </>
    )
}
export default Header;