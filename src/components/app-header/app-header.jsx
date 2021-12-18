import React from 'react';
import appHeaderStyles from './app-header.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from 'react-router-dom'
import {ROUTE_MAIN, ROUTE_PROFILE} from "../../utils/const";
import classNames from "classnames";

const AppHeader = () => {
    const {pathname} = useLocation()
    return (
        <header className={appHeaderStyles.wrapper}>
            <div className={appHeaderStyles.content}>
                <nav>
                    <ul className={appHeaderStyles.menu}>
                        <li className={appHeaderStyles.menu_item}>
                            <Link className={classNames(appHeaderStyles.link, {
                                [appHeaderStyles.active]: pathname === ROUTE_MAIN
                            })} to={ROUTE_MAIN}>
                                <BurgerIcon type={pathname === ROUTE_MAIN ? "primary" : "secondary"}/>
                                <p className="text text_type_main-default ml-2">Конструктор</p>
                            </Link>
                        </li>
                        <li className={appHeaderStyles.menu_item}>
                            <Link className={classNames(appHeaderStyles.link, {
                                [appHeaderStyles.active]: pathname === '/not_found'
                            })} to={'/not_found'}>
                                <ListIcon type={pathname === '/not_found' ? "primary" : "secondary"}/>
                                <p className="text text_type_main-default ml-2">
                                    Лента заказов
                                </p>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <section className={appHeaderStyles.logo_section}>
                    <Logo/>
                </section>
                <section className={appHeaderStyles.auth_section}>
                    <Link className={classNames(appHeaderStyles.link, {
                        [appHeaderStyles.active]: pathname.includes(ROUTE_PROFILE)
                    })} to={ROUTE_PROFILE}>
                        <ProfileIcon type={pathname.includes(ROUTE_PROFILE) ? "primary" : "secondary"}/>
                        <p className="text text_type_main-default ml-2">Личный кабинет</p>
                    </Link>
                </section>
            </div>
        </header>
    );
};

export default AppHeader;