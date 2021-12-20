import React, {useEffect, useState} from 'react';
import forgotStyles from './forgot-password.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ROUTE_LOGIN, ROUTE_RESET_PASSWORD} from "../../utils/const";
import {useDispatch, useSelector} from "react-redux";
import {fetchForgotPassword} from "../../services/actions/auth-action-creators";
import {getAuthIsLoading, getCanResetPassword} from "../../services/selectors/auth-selectors";
import {validateEmail} from "../../utils/service";
import AuthError from "../../components/auth-error/auth-error";

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const canResetPassword = useSelector(state => getCanResetPassword(state))
    const isAuthLoading = useSelector(state => getAuthIsLoading(state))
    useEffect(() => {
        if (canResetPassword) navigate(ROUTE_RESET_PASSWORD, {state: {from: location.pathname}})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canResetPassword])
    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const onButtonClick = () => {
        const emailError = validateEmail(email)
        setError(emailError)
        if (!emailError) {
            dispatch(fetchForgotPassword(email))
        }
    }
    return (
        <div className={forgotStyles.wrapper}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <Input
                type={'text'}
                placeholder={'Укажите E-mail'}
                onChange={onEmailChange}
                value={email}
                name={'email'}
                error={!!error}
                errorText={error}
                size={'default'}
            />
            <Button type="primary" size="medium" onClick={onButtonClick} disabled={isAuthLoading}>
                Восстановить
            </Button>
            <div className={forgotStyles.hint + ' mt-15'}>
                <p className="text text_type_main-default"> Вспомнили пароль? </p>
                <Link to={ROUTE_LOGIN} className={forgotStyles.link}>
                    <p className="text text_type_main-default">Войти </p>
                </Link>
            </div>
            <AuthError/>
        </div>
    );
};

export default ForgotPassword;