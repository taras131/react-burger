import React, {useEffect, useState} from 'react';
import forgotStyles from "../forgot-password/forgot-password.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ROUTE_FORGOT_PASSWORD, ROUTE_LOGIN, ROUTE_MAIN} from "../../utils/const";
import {useDispatch} from "react-redux";
import {fetchResetPassword} from "../../services/actions/auth-action-creators";

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log(location)
    const [data, setData] = useState({
        password: '',
        key: ''
    })
    useEffect(()=> {
        if(!location.state || location.state.from !== ROUTE_FORGOT_PASSWORD) {
            console.log("navigate")
            navigate(ROUTE_MAIN)
        }
    },[])
    const onDataChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const onButtonClick = () => {
        dispatch(fetchResetPassword(data))
    }

    return (
        <div className={forgotStyles.wrapper}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <Input
                type={'text'}
                placeholder={'Введите новый пароль'}
                onChange={onDataChange}
                value={data.password}
                name={'password'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                icon={'ShowIcon'}
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={onDataChange}
                value={data.key}
                name={'key'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Button type="primary" size="medium" onClick={onButtonClick}>
                Сохранить
            </Button>
            <div className={forgotStyles.hint + ' mt-15'}>
                <p className="text text_type_main-default"> Вспомнили пароль? </p>
                <Link to={ROUTE_LOGIN} className={forgotStyles.link}>
                    <p className="text text_type_main-default">Войти </p>
                </Link>
            </div>

        </div>
    );
};

export default ResetPassword;