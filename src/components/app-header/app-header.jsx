import React from 'react';
import appHeaderStyles from './app-header.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from 'react-router-dom'
import {ROUTE_LOGIN, ROUTE_MAIN, ROUTE_PROFILE} from "../../utils/const";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../services/selectors/auth-selectors";

const AppHeader = () => {
    const isAuth = useSelector(state => getIsAuth(state))
    return (
        <header className={appHeaderStyles.wrapper}>
            <div className={appHeaderStyles.content}>
                <nav>
                    <ul className={appHeaderStyles.menu}>
                        <li className={appHeaderStyles.button}>
                            <NavLink className={({isActive}) => isActive
                                ? `${appHeaderStyles.active} +" "+ ${appHeaderStyles.link}`
                                : appHeaderStyles.link}
                                     to={ROUTE_MAIN}>
                                <BurgerIcon type="primary"/>
                                <p className="text text_type_main-default ml-2">Конструктор</p>
                            </NavLink>
                        </li>
                        <li className={appHeaderStyles.button}>
                            <ListIcon type="secondary"/>
                            <p className="text text_type_main-default ml-2">
                                Лента заказов
                            </p>
                        </li>
                    </ul>
                </nav>
                <section className={appHeaderStyles.logo_section}>
                    <Logo/>
                </section>
                <section className={appHeaderStyles.auth_section}>
                    <NavLink
                        className={({isActive}) => isActive
                            ? `${appHeaderStyles.active} +" "+ ${appHeaderStyles.link}`
                            : appHeaderStyles.link}
                        to={isAuth ? ROUTE_PROFILE : ROUTE_LOGIN}
                    >
                        <ProfileIcon type="primary"/>
                        <p className="text text_type_main-default ml-2">Личный кабинет</p>
                    </NavLink>
                </section>
            </div>
        </header>
    );
};

export default AppHeader;