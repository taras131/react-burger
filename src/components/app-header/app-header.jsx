import React from 'react';
import appHeaderStyle from './app-header.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
    return (
        <header className={appHeaderStyle.wrapper}>
            <div className={appHeaderStyle.content}>
                <nav>
                    <ul className={appHeaderStyle.menu}>
                        <li className={appHeaderStyle.button}>
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default ml-2">Конструктор</p>
                        </li>
                        <li className={appHeaderStyle.button}>
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default ml-2"
                            style = {{color: '#8585AD'}}>
                                Лента заказов
                            </p>
                        </li>
                    </ul>
                </nav>
                <section className={appHeaderStyle.logo_section}>
                    <Logo/>
                </section>
                <section className={appHeaderStyle.auth_section}>
                    <div className={appHeaderStyle.button}>
                        <ProfileIcon type="primary" />
                        <p className="text text_type_main-default ml-2">Личный кабинет</p>
                    </div>
                </section>
            </div>
        </header>
    );
};

export default AppHeader;