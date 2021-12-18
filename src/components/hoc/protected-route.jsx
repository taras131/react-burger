import React from 'react';
import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../services/selectors/auth-selectors";
import {ROUTE_LOGIN} from "../../utils/const";
import PropTypes from "prop-types";

const ProtectedRoute = ({children}) => {
    const location = useLocation()
    const isAuth = useSelector(state => getIsAuth(state))
    if (!isAuth) return (<Navigate to={ROUTE_LOGIN} state={{from: location}}/>)
    return children;
};
ProtectedRoute.propTypes ={
    children: PropTypes.element.isRequired,
}

export default ProtectedRoute;