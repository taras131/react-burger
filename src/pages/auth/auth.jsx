import React, {useEffect, useState} from 'react';
import loginStyles from './auth.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from 'react-router-dom'
import {ROUTE_FORGOT_PASSWORD, ROUTE_LOGIN, ROUTE_MAIN, ROUTE_REGISTER} from "../../utils/const";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin, fetchRegister} from "../../services/actions/auth-action-creators";
import {getIsAuth} from "../../services/selectors/auth-selectors";
import {useNavigate} from "react-router-dom";
import {validateEmail, validationName, validationPassword} from "../../utils/service";

const Auth = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const location = useLocation()
    let prevPath = null
    if (location.state && location.state.from) prevPath = location.state.from.pathname
    const isAuth = useSelector(state => getIsAuth(state))
    const [data, setData] = useState({
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
        setData({
            name: '',
            email: '',
            password: ''
        })
    },[isRegister])
    const onDataChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const emailError = validateEmail(data.email)
        const passwordError = validationPassword(data.password)
        let nameError = ''
        if(isRegister){
            nameError = validationName(data.name)
        }
        setErrors({
            name: nameError,
            email: emailError,
            password: passwordError
        })
        if(isRegister){
            if(!nameError && !emailError && !passwordError){
                dispatch(fetchRegister(data))
            }
        } else {
            if(!emailError && !passwordError){
                dispatch(fetchLogin({email: data.email, password: data.password}))
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
                    value={data.name}
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
                value={data.email}
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
                value={data.password}
                name={'password'}
                error={!!errors.password}
                errorText={errors.password}
                size={'default'}
            />
            <Button type="primary" size="medium">
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
        </form>
    );
};

export default Auth;