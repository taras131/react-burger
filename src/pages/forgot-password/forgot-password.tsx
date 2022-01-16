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
import {RootState} from "../../services/store";

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const canResetPassword = useSelector((state: RootState) => getCanResetPassword(state))
    const isAuthLoading = useSelector((state: RootState) => getAuthIsLoading(state))
    useEffect(() => {
        if (canResetPassword) navigate(ROUTE_RESET_PASSWORD, {state: {from: location.pathname}})
    }, [canResetPassword, navigate, location])
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }
    const onButtonClick = (): void => {
        const emailError = validateEmail(email)
        emailError ? setError(emailError) : dispatch(fetchForgotPassword(email))
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