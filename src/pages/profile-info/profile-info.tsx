import React, {useState} from 'react';
import profileInfoStyles from './profile-info.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {fetchUpdateUser} from "../../services/actions/auth-action-creators";
import {getAuthIsLoading, getUser} from "../../services/selectors/auth-selectors";
import classNames from "classnames";
import {validateEmail, validationName, validationPassword} from "../../utils/service";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

const ProfileInfo = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => getUser(state))
    const isAuthLoading = useAppSelector(state  => getAuthIsLoading(state))

    const [inputsValues, setInputsValues] = useState({
        name: user.name,
        email: user.email,
        password: ''
    })
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [isDataChange, setIsDataChange] = useState(false)
    const onDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!isDataChange) setIsDataChange(true)
        setInputsValues({...inputsValues, [e.target.name]: e.target.value})
    }
    const onSaveClick = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const emailError = validateEmail(inputsValues.email)
        const nameError = validationName(inputsValues.name)
        let passwordError = ''
        if(inputsValues.password){
            passwordError = validationPassword(inputsValues.password)
        }
        setErrors({
            name: nameError,
            email: emailError,
            password: passwordError
        })
        if(!nameError && !emailError && !passwordError) {
            dispatch(fetchUpdateUser(inputsValues))
            setIsDataChange(false)
        }
    }
    const onCancelClick = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setInputsValues({
            name: user.name,
            email: user.email,
            password: ''
        })
        setErrors({
            name: '',
            email: '',
            password: ''
        })
        setIsDataChange(false)
    }
    return (
        <form onSubmit={onSaveClick} className={profileInfoStyles.input_section}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onDataChange}
                icon={'EditIcon'}
                value={inputsValues.name}
                name={'name'}
                error={!!errors.name}
                errorText={errors.name}
                size={'default'}
            />
            <Input
                type={'text'}
                placeholder={'E-mail'}
                onChange={onDataChange}
                icon={'EditIcon'}
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
                icon={'EditIcon'}
                value={inputsValues.password}
                name={'password'}
                error={!!errors.password}
                errorText={errors.password}
                size={'default'}
            />
            <div className={classNames(profileInfoStyles.button_section, {
                [profileInfoStyles.show]: isDataChange
            })}>
                <button  onClick={onCancelClick} className={profileInfoStyles.cancel_button} type="reset">
                    <p className="text text_type_main-small"> Отмена</p>
                </button>
                <Button type="primary" size="small" disabled={isAuthLoading}>
                    <p className="text text_type_main-small">Сохранить</p>
                </Button>
            </div>
        </form>
    );
};

export default ProfileInfo;