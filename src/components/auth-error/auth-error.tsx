import React, {FC, useEffect} from 'react';
import authErrorStyles from './autch-error.module.css'
import classNames from "classnames";
import {useDispatch} from "react-redux";
import {removeError} from '../../services/reducers/auth-slice'
import {getAuthErrorMessage} from "../../services/selectors/auth-selectors";
import {useAppSelector} from "../../hooks/redux";

const AuthError: FC = () => {
    const dispatch = useDispatch()
    const authErrorMessage = useAppSelector(state => getAuthErrorMessage(state))
    useEffect(() => {
        let timeOut: ReturnType<typeof setTimeout>
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