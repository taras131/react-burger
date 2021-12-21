import React, {useEffect} from 'react';
import authErrorStyles from './autch-error.module.css'
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {removeError} from '../../services/reducers/auth-slice'
import {getAuthErrorMessage} from "../../services/selectors/auth-selectors";

const AuthError = () => {
    const dispatch = useDispatch()
    const authErrorMessage = useSelector(state => getAuthErrorMessage(state))
    useEffect(() => {
        let timeOut
        if (authErrorMessage) {
            timeOut = setTimeout(() => {
                dispatch(removeError())
            }, 4000)
        }
        return () => {
            clearTimeout(timeOut)
        }
    }, [authErrorMessage, dispatch])

    return (
        <div className={classNames(authErrorStyles.wrapper, {
            [authErrorStyles.show]: !!authErrorMessage
        })}>
            <p className="text text_type_main-default">{authErrorMessage}</p>
        </div>
    );
};

export default AuthError;