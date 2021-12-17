import React from 'react';
import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../services/selectors/auth-selectors";
import {ROUTE_MAIN} from "../../utils/const";

const ProtectedRoute = ({children}) => {
    const location = useLocation()
    const isAuth = useSelector(state => getIsAuth(state))
    if (!isAuth) return (<Navigate to={ROUTE_MAIN} state={{from: location}}/>)
    return children;
};

export default ProtectedRoute;