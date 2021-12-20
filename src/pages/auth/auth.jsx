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

const Auth = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const location = useLocation()
    let prevPath = null
    if (location.state && location.state.from) prevPath = location.state.from.pathname
    const isAuth = useSelector(state => getIsAuth(state))
    const isAuthLoading = useSelector(state => getAuthIsLoading(state))
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
    useEffect(()=>{
        if(isAuth) {
            navigate(prevPath || ROUTE_MAIN)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isAuth])
    useEffect(()=>{
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
    },[isRegister])
    const onDataChange = (e) => {
        setInputsValues({...inputsValues, [e.target.name]: e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const emailError = validateEmail(inputsValues.email)
        const passwordError = validationPassword(inputsValues.password)
        let nameError = ''
        if(isRegister){
            nameError = validationName(inputsValues.name)
        }
        setErrors({
            name: nameError,
            email: emailError,
            password: passwordError
        })
        if(isRegister){
            if(!nameError && !emailError && !passwordError){
                dispatch(fetchRegister(inputsValues))
            }
        } else {
            if(!emailError && !passwordError){
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
            <AuthError/>
        </form>
    );
};

export default Auth;