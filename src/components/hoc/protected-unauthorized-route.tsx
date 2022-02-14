import React, {FC, ReactElement} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {getIsAuth} from "../../services/selectors/auth-selectors";
import {ROUTE_MAIN} from "../../utils/const";
import {useAppSelector} from "../../hooks/redux";

type TProtectedUnauthorizedRoute = {
    children: ReactElement
}
const ProtectedUnauthorizedRoute: FC<TProtectedUnauthorizedRoute> = ({children}) => {
    const location = useLocation()
    const isAuth: boolean = useAppSelector(state => getIsAuth(state))
    if (isAuth) return (<Navigate to={ROUTE_MAIN} state={{from: location}}/>)
    return children;
};

export default ProtectedUnauthorizedRoute;