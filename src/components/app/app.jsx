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
import {getAuthErrorMessage, getAuthIsLoading} from "../../services/selectors/auth-selectors";
import {
    ROUTE_FORGOT_PASSWORD,
    ROUTE_INGREDIENTS,
    ROUTE_LOGIN,
    ROUTE_MAIN, ROUTE_ORDERS,
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
import ProfileInfo from "../../pages/profile-info/profile-info";
import Orders from "../../pages/orders/orders";

const App = () => {
    const dispatch = useDispatch()
    const isShowOrderDetails = useSelector(state => getIsShowOrderDetails(state))
    const isIngredientsLoading = useSelector(state => getIsIngredientsLoading(state))
    const isCartLoading = useSelector(state => getIsCartLoading(state))
    const isAuthLoading = useSelector(state => getAuthIsLoading(state))
    const ingredientsErrorMessage = useSelector(state => getIngredientsErrorMessage(state))
    const cartErrorMessage = useSelector(state => getCartErrorMessage(state))
    const authErrorMessage = useSelector(state => getAuthErrorMessage(state))
    useEffect(() => {
        dispatch(fetchIngredients())
        dispatch(fetchCheckAuth())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (isIngredientsLoading || isCartLoading || isAuthLoading) return (<Preloader/>)
    if (ingredientsErrorMessage) return (<ErrorMessage errorMessage={ingredientsErrorMessage}/>)
    if (cartErrorMessage) return (<ErrorMessage errorMessage={cartErrorMessage}/>)
    if (authErrorMessage) return (<ErrorMessage errorMessage={authErrorMessage}/>)
    return (
        <div className={appStyles.wrapper}>
            <BrowserRouter>
                <AppHeader/>
                <Routes>
                    <Route path={ROUTE_MAIN} element={<Main/>}/>
                    <Route path={ROUTE_LOGIN} element={<Auth/>}/>
                    <Route path={ROUTE_REGISTER} element={<Auth/>}/>
                    <Route path={ROUTE_INGREDIENTS+'/:id'} element={<Ingredients/>}/>
                    <Route path={ROUTE_PROFILE + '/*'} element={
                        <ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>
                    }>
                        <Route path="" element={<ProfileInfo/>}/>
                        <Route path={ROUTE_ORDERS} element={<Orders/>}/>
                    </Route>
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
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
            {isShowOrderDetails && (<OrderDetails/>)}
        </div>
    );
}

export default App;
