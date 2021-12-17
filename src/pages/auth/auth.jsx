import React, {useEffect, useState} from 'react';
import loginStyles from './auth.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from 'react-router-dom'
import {ROUTE_FORGOT_PASSWORD, ROUTE_LOGIN, ROUTE_MAIN, ROUTE_REGISTER} from "../../utils/const";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin, fetchRegister} from "../../services/actions/auth-action-creators";
import {getIsAuth} from "../../services/selectors/auth-selectors";
import {useNavigate} from "react-router-dom";

const Auth = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const isAuth = useSelector(state => getIsAuth(state))
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const {pathname} = useLocation()
    const isRegister = pathname === ROUTE_REGISTER
    useEffect(()=>{
        if(isAuth) {
            console.log("navigation")
            navigate(ROUTE_MAIN)
        }
    },[isAuth])
    const onDataChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const onButtonClick = (e) => {
        e.preventDefault()
        if(isRegister){
            dispatch(fetchRegister(data))
        } else {
            dispatch(fetchLogin({email: data.email, password: data.password}))
        }
    }
    return (
        <div className={loginStyles.wrapper}>
            <h1 className="text text_type_main-medium">{isRegister ? 'Регистрация' : 'Вход'}</h1>
            {isRegister && (
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
            )}
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
            <Button type="primary" size="medium" onClick={onButtonClick}>
                {isRegister ? "Зарегистрироваться" : "Войти"}
            </Button>
            <div className={'mt-10'}>
                {isRegister
                    ? (<div className={loginStyles.hint}>
                        <p className="text text_type_main-default"> Уже зарегистрированы ? </p>
                        <Link to={ROUTE_LOGIN} className={loginStyles.link}>
                            <p className="text text_type_main-default">Войти </p>
                        </Link>
                    </div>)
                    : (<>
                        <div className={loginStyles.hint}>
                            <p className="text text_type_main-default"> Вы новый пользователь ? </p>
                            <Link to={ROUTE_REGISTER} className={loginStyles.link}>
                                <p className="text text_type_main-default">Зарегистрироваться </p>
                            </Link>
                        </div>
                        <div className={loginStyles.hint + ' mt-4'}>
                            <p className="text text_type_main-default"> Забыли пароль ? </p>
                            <Link to={ROUTE_FORGOT_PASSWORD} className={loginStyles.link}>
                                <p className="text text_type_main-default">Востановить пароль </p>
                            </Link>
                        </div>
                    </>)}
            </div>
        </div>
    );
};

export default Auth;