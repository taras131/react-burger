import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../services/selectors/auth-selectors";
import {ROUTE_MAIN} from "../../utils/const";
import PropTypes from "prop-types";

const RequireNotAuth = ({children}) => {
    const location = useLocation()
    const isAuth = useSelector(state => getIsAuth(state))
    if (isAuth) return (<Navigate to={ROUTE_MAIN} state={{from: location}}/>)
    return children;
};
RequireNotAuth.propTypes ={
    children: PropTypes.element.isRequired,
}

export default RequireNotAuth;