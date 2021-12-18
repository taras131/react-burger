import React, {useState} from 'react';
import profileInfoStyles from './profile-info.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {fetchUpdateUser} from "../../services/actions/auth-action-creators";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../services/selectors/auth-selectors";
import classNames from "classnames";
import {validateEmail, validationName, validationPassword} from "../../utils/service";

const ProfileInfo = () => {
    const user = useSelector(state => getUser(state))
    const dispatch = useDispatch()
    const [data, setData] = useState({
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
    const onDataChange = (e) => {
        if(!isDataChange) setIsDataChange(true)
        setData({...data, [e.target.name]: e.target.value})
    }
    const onSaveClick = (e) => {
        e.preventDefault()
        const emailError = validateEmail(data.email)
        const nameError = validationName(data.name)
        let passwordError = ''
        if(data.password){
            passwordError = validationPassword(data.password)
        }
        setErrors({
            name: nameError,
            email: emailError,
            password: passwordError
        })
        if(!nameError && !emailError && !passwordError) {
            dispatch(fetchUpdateUser(data))
            setIsDataChange(false)
        }
    }
    const onCancelClick = (e) => {
        e.preventDefault()
        setData({
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
        <form className={profileInfoStyles.input_section}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onDataChange}
                icon={'EditIcon'}
                value={data.name}
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
                icon={'EditIcon'}
                value={data.password}
                name={'password'}
                error={!!errors.password}
                errorText={errors.password}
                size={'default'}
            />
            <div className={classNames(profileInfoStyles.button_section, {
                [profileInfoStyles.show]: isDataChange
            })}>
                <Button type="secondary" size="small" onClick={onCancelClick}>
                    <p className="text text_type_main-small"> Отмена</p>
                </Button>
                <Button type="primary" size="small" onClick={onSaveClick}>
                    <p className="text text_type_main-small">Сохранить</p>
                </Button>
            </div>
        </form>
    );
};

export default ProfileInfo;