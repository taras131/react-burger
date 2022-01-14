import React, {FC} from 'react';
import profileStyles from './profile.module.css'
import {Link, Outlet, useLocation} from 'react-router-dom'
import {ROUTE_ORDERS} from "../../utils/const";
import {useDispatch} from "react-redux";
import {fetchLogOut} from "../../services/actions/auth-action-creators";
import classNames from "classnames";

const Profile: FC = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const pathname = location.pathname.split('/')[2]
    const onOutClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        dispatch(fetchLogOut())
    }
    return (
        <div className={profileStyles.wrapper}>
            <div className={profileStyles.content}>
                <section>
                    <nav className={profileStyles.navigation}>
                        <Link to="" className={classNames(profileStyles.link, {
                            [profileStyles.active]: !pathname
                        })}>
                            <p className="text text_type_main-medium">Профиль</p>
                        </Link>
                        <Link to={ROUTE_ORDERS} className={classNames(profileStyles.link, {
                            [profileStyles.active]: pathname === ROUTE_ORDERS
                        })}>
                            <p className="text text_type_main-medium">История заказов</p>
                        </Link>
                        <button className={profileStyles.link} onClick={onOutClick}>
                            <p className="text text_type_main-medium">Выход</p>
                        </button>
                    </nav>
                    <div className={profileStyles.hint + " mt-20"}>
                        <p className="text text_type_main-default">
                            В этом разделе вы сможете
                            {!pathname && "изменить свои персональные данные"}
                            {pathname === ROUTE_ORDERS && " посмотреть свою историю заказов"}
                        </p>
                    </div>
                </section>
                <Outlet/>
            </div>
        </div>
    );
};

export default Profile;