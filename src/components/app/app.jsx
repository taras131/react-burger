import React, {useEffect} from 'react';
import './app.module.css';
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css"
import OrderDetails from "../order-details/order-details";
import Preloader from "../preloader/preloader";
import ErrorMessage from "../error-message/error-message";
import {fetchIngredients} from "../../services/actions/ingredients-action-creators";
import {useDispatch, useSelector} from "react-redux";
import {getCartErrorMessage, getIsCartLoading, getIsShowOrderDetails} from "../../services/selectors/cart-selectors";
import {
    getIngredientsErrorMessage,
    getIsIngredientsLoading,
} from "../../services/selectors/ingredients-selectors";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import {getAuthIsLoading, getIsAuth} from "../../services/selectors/auth-selectors";
import {
    ROUTE_FORGOT_PASSWORD,
    ROUTE_INGREDIENTS,
    ROUTE_LOGIN,
    ROUTE_MAIN,
    ROUTE_PROFILE,
    ROUTE_REGISTER,
    ROUTE_RESET_PASSWORD
} from "../../utils/const";
import Main from "../../pages/main/main";
import Ingredients from "../../pages/ingredients/ingredients";
import ResetPassword from "../../pages/reset-password/reset-password";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Profile from "../../pages/profile/profile";
import Auth from "../../pages/auth/auth";
import ProtectedRoute from "../hoc/protected-route";
import RequireNotAuth from "../hoc/require-not-auth";
import {fetchCheckAuth} from "../../services/actions/auth-action-creators";

const App = () => {
    const dispatch = useDispatch()
    const isShowOrderDetails = useSelector(state => getIsShowOrderDetails(state))
    const isIngredientsLoading = useSelector(state => getIsIngredientsLoading(state))
    const isCartLoading = useSelector(state => getIsCartLoading(state))
    const isAuthLoading = useSelector(state => getAuthIsLoading(state))
    const isAuth = useSelector(state => getIsAuth(state))
    const ingredientsErrorMessage = useSelector(state => getIngredientsErrorMessage(state))
    const cartErrorMessage = useSelector(state => getCartErrorMessage(state))
    const token = localStorage.getItem('accessToken')
    useEffect(() => {
        dispatch(fetchIngredients())
        if(token) dispatch(fetchCheckAuth(token))
    }, [])
    if (isIngredientsLoading || isCartLoading || isAuthLoading) return (<Preloader/>)
    if (ingredientsErrorMessage) return (<ErrorMessage errorMessage={ingredientsErrorMessage}/>)
    if (cartErrorMessage) return (<ErrorMessage errorMessage={cartErrorMessage}/>)
    return (
        <div className={appStyles.wrapper}>
            <BrowserRouter>
                <AppHeader/>
                <Routes>
                    <Route path={ROUTE_MAIN} element={<Main/>}/>
                    <Route path={ROUTE_INGREDIENTS} element={<Ingredients/>}/>
                    <Route path={ROUTE_PROFILE} element={
                        <ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>
                    }/>
                    <Route path={ROUTE_RESET_PASSWORD} element={
                        <RequireNotAuth>
                            <ResetPassword/>
                        </RequireNotAuth>
                    }/>

                    <Route path={ROUTE_FORGOT_PASSWORD} element={
                        <RequireNotAuth>
                            <ForgotPassword/>
                        </RequireNotAuth>
                    }/>
                    <Route path={ROUTE_LOGIN} element={
                        <RequireNotAuth>
                            <Auth/>
                        </RequireNotAuth>
                    }/>
                    <Route path={ROUTE_REGISTER} element={
                        <RequireNotAuth>
                            <Auth/>
                        </RequireNotAuth>
                    }/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
            {isShowOrderDetails && (<OrderDetails/>)}
        </div>
    );
}

export default App;
