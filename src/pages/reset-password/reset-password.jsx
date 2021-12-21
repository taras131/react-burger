import React, {useEffect, useState} from 'react';
import forgotStyles from "../forgot-password/forgot-password.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ROUTE_FORGOT_PASSWORD, ROUTE_LOGIN} from "../../utils/const";
import {useDispatch, useSelector} from "react-redux";
import {fetchResetPassword} from "../../services/actions/auth-action-creators";
import {validationPassword} from "../../utils/service";
import AuthError from "../../components/auth-error/auth-error";
import {getAuthIsLoading, getCanResetPassword} from "../../services/selectors/auth-selectors";

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const canResetPassword = useSelector(state => getCanResetPassword(state))
    const isAuthLoading = useSelector(state => getAuthIsLoading(state))
    const [inputsValues, setInputsValues] = useState({
        password: '',
        key: ''
    })
    const [passwordError, setPasswordError] = useState('')
    useEffect(() => {
        if (!location.state || location.state.from !== ROUTE_FORGOT_PASSWORD) {
            navigate(ROUTE_FORGOT_PASSWORD)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (!canResetPassword) navigate(ROUTE_LOGIN)
    }, [canResetPassword, navigate])
    const onDataChange = (e) => {
        setInputsValues({...inputsValues, [e.target.name]: e.target.value})
    }
    const onButtonClick = (e) => {
        e.preventDefault()
        const passwordError = validationPassword(inputsValues.password)
        setPasswordError(passwordError)
        if (!passwordError) {
            dispatch(fetchResetPassword(inputsValues))
        }
    }
    return (
        <div className={forgotStyles.wrapper}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <Input
                type={'text'}
                placeholder={'Введите новый пароль'}
                onChange={onDataChange}
                value={inputsValues.password}
                name={'password'}
                error={!!passwordError}
                errorText={passwordError}
                size={'default'}
                icon={'ShowIcon'}
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={onDataChange}
                value={inputsValues.key}
                name={'key'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Button type="primary" size="medium" onClick={onButtonClick} disabled={isAuthLoading}>
                Сохранить
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

export default ResetPassword;