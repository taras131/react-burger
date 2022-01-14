import React, {FC, ReactElement} from 'react';
import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../services/selectors/auth-selectors";
import {ROUTE_LOGIN} from "../../utils/const";
import {RootState} from "../../services/store";

type TProtectedAuthorizedRoute ={
    children: ReactElement
}
const ProtectedAuthorizedRoute: FC<TProtectedAuthorizedRoute> = ({children}) => {
    const location = useLocation()
    const isAuth: boolean = useSelector((state: RootState) => getIsAuth(state))
    if (!isAuth) return (<Navigate to={ROUTE_LOGIN} state={{from: location}}/>)
    return children;
};

export default ProtectedAuthorizedRoute;