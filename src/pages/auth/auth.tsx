import React, {useEffect, useState} from 'react';
import loginStyles from './auth.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from 'react-router-dom'
import {ROUTE_FORGOT_PASSWORD, ROUTE_LOGIN, ROUTE_MAIN, ROUTE_REGISTER} from "../../utils/const";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin, fetchRegister} from "../../services/actions/auth-action-creators";
import {getAuthIsLoading, getIsAuth} from "../../services/selectors/auth-selectors";
import {useNavigate} from "react-router-dom";
import {validateEmail, validationName, validationPassword} from "../../utils/service";
import AuthError from "../../components/auth-error/auth-error";
import {RootState} from "../../services/store";
import {TLocation} from "../../models/i-location";

const Auth = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const location = useLocation() as TLocation;
    let prevPath: string | null = null
    if (location.state && location.state.from) prevPath = location.state.from.pathname
    const isAuth = useSelector((state: RootState) => getIsAuth(state))
    const isAuthLoading = useSelector((state: RootState) => getAuthIsLoading(state))
    const [inputsValues, setInputsValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    })
    const {pathname} = useLocation()
    const isRegister = pathname === ROUTE_REGISTER
    useEffect(() => {
        if (isAuth && prevPath) {
            navigate(prevPath)
        } else {
            if (isAuth) navigate(ROUTE_MAIN)
        }
    }, [isAuth, navigate, prevPath])
    useEffect(() => {
        setErrors({
            name: '',
            email: '',
            password: ''
        })
        setInputsValues({
            name: '',
            email: '',
            password: ''
        })
    }, [isRegister])
    const onDataChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputsValues({...inputsValues, [e.target.name]: e.target.value})
    }
    const onSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault()
        const emailError = validateEmail(inputsValues.email)
        const passwordError = validationPassword(inputsValues.password)
        const nameError = isRegister ? validationName(inputsValues.name) : '';
        setErrors({
            name: nameError,
            email: emailError,
            password: passwordError
        })
        if (isRegister) {
            if (!nameError && !emailError && !passwordError) {
                dispatch(fetchRegister(inputsValues))
            }
        } else {
            if (!emailError && !passwordError) {
                dispatch(fetchLogin({email: inputsValues.email, password: inputsValues.password}))
            }
        }
    }
    return (
        <form onSubmit={onSubmit} className={loginStyles.wrapper}>
            <h1 className="text text_type_main-medium">{isRegister ? 'Регистрация' : 'Вход'}</h1>
            {isRegister && (
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onDataChange}
                    value={inputsValues.name}
                    name={'name'}
                    error={!!errors.name}
                    errorText={errors.name}
                    size={'default'}
                />
            )}
            <Input
                type={'text'}
                placeholder={'E-mail'}
                onChange={onDataChange}
                value={inputsValues.email}
                name={'email'}
                error={!!errors.email}
                errorText={errors.email}
                size={'default'}
            />
            <Input
                type={'text'}
                placeholder={'Пароль'}
                onChange={onDataChange}
                icon={'ShowIcon'}
                value={inputsValues.password}
                name={'password'}
                error={!!errors.password}
                errorText={errors.password}
                size={'default'}
            />
            <Button type="primary" size="medium" disabled={isAuthLoading}>
                {isRegister && "Зарегистрироваться"}
                {!isRegister && "Войти"}
            </Button>
            <div className={'mt-10'}>
                <div className={loginStyles.hint}>
                    <p className="text text_type_main-default">
                        {isRegister && 'Уже зарегистрированы ?'}
                        {!isRegister && 'Вы новый пользователь ?'}
                    </p>
                    <Link to={isRegister ? ROUTE_LOGIN : ROUTE_REGISTER} className={loginStyles.link}>
                        <p className="text text_type_main-default">
                            {isRegister && 'Войти'}
                            {!isRegister && 'Зарегистрироваться'}
                        </p>
                    </Link>
                </div>
                {!isRegister && (
                    <div className={loginStyles.hint + ' mt-4'}>
                        <p className="text text_type_main-default"> Забыли пароль ? </p>
                        <Link to={ROUTE_FORGOT_PASSWORD} className={loginStyles.link}>
                            <p className="text text_type_main-default">Востановить пароль </p>
                        </Link>
                    </div>
                )}
            </div>
            <AuthError/>
        </form>
    );
};

export default Auth;