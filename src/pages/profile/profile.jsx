import React, {useState} from 'react';
import profileStyles from './profile.module.css'
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from 'react-router-dom'
import {ROUTE_MAIN, ROUTE_PROFILE} from "../../utils/const";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../services/selectors/auth-selectors";
import {fetchLogOut} from "../../services/actions/auth-action-creators";

const Profile = () => {
    const user = useSelector(state => getUser(state))
    const dispatch = useDispatch()
    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        password: ''
    })
    const onDataChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const onOutClick = (e) => {
        e.preventDefault()
        dispatch(fetchLogOut())
    }
    return (
        <div className={profileStyles.wrapper}>
            <div className={profileStyles.content}>
                <section>
                    <nav className={profileStyles.navigation}>
                        <Link to={ROUTE_PROFILE} className={profileStyles.link + ' ' + profileStyles.active}>
                            <p className="text text_type_main-medium">Профиль</p>
                        </Link>
                        <Link to={'/not-found'} className={profileStyles.link}>
                            <p className="text text_type_main-medium">История заказов</p>
                        </Link>
                        <button className={profileStyles.link} onClick={onOutClick}>
                            <p className="text text_type_main-medium">Выход</p>
                        </button>
                    </nav>
                    <div className={profileStyles.hint + " mt-20"}>
                        <p className="text text_type_main-default">
                            В этом разделе вы сможете изменить свои персональные данные
                        </p>
                    </div>
                </section>
                <section className={profileStyles.input_section}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onDataChange}
                        value={data.name}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
                        onChange={onDataChange}
                        value={data.email}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Пароль'}
                        onChange={onDataChange}
                        icon={'ShowIcon'}
                        value={data.password}
                        name={'password'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </section>
            </div>
        </div>
    );
};

export default Profile;