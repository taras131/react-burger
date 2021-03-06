import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import OrderDetails from "../order-details/order-details";
import Preloader from "../preloader/preloader";
import ErrorMessage from "../error-message/error-message";
import {fetchIngredients} from "../../services/actions/ingredients-action-creators";
import {getCartErrorMessage, getIsCartLoading, getIsShowOrderDetails} from "../../services/selectors/cart-selectors";
import {
    getIngredientsErrorMessage,
    getIsIngredientsLoading,
} from "../../services/selectors/ingredients-selectors";
import {Routes, Route, useLocation} from "react-router-dom";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import {
    ROUTE_FEED,
    ROUTE_FORGOT_PASSWORD,
    ROUTE_INGREDIENTS,
    ROUTE_LOGIN,
    ROUTE_MAIN, ROUTE_ORDERS,
    ROUTE_PROFILE,
    ROUTE_REGISTER,
    ROUTE_RESET_PASSWORD
} from "../../utils/const";
import appStyles from './app.module.css'
import Main from "../../pages/main/main";
import Ingredients from "../../pages/ingredients/ingredients";
import ResetPassword from "../../pages/reset-password/reset-password";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Profile from "../../pages/profile/profile";
import Auth from "../../pages/auth/auth";
import {fetchCheckAuth} from "../../services/actions/auth-action-creators";
import ProfileInfo from "../../pages/profile-info/profile-info";
import Orders from "../../pages/orders/orders";
import ProtectedUnauthorizedRoute from "../hoc/protected-unauthorized-route";
import ProtectedAuthorizedRoute from "../hoc/protected-authorized-route";
import Feed from "../../pages/feed/feed";
import FeedOrderDetails from "../../pages/feed-order-details/feed-order-details";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

const App = () => {
    const dispatch = useAppDispatch()
    let location = useLocation();
    let state = location.state as { backgroundLocation?: Location };
    const isShowOrderDetails = useAppSelector(state => getIsShowOrderDetails(state))
    const isIngredientsLoading = useAppSelector(state => getIsIngredientsLoading(state))
    const isCartLoading = useAppSelector(state => getIsCartLoading(state))
    const ingredientsErrorMessage = useAppSelector(state=> getIngredientsErrorMessage(state))
    const cartErrorMessage = useAppSelector(state => getCartErrorMessage(state))
    useEffect(() => {
        dispatch(fetchIngredients())
        dispatch(fetchCheckAuth())
    }, [dispatch])
    if (isIngredientsLoading || isCartLoading) return (<Preloader/>)
    if (ingredientsErrorMessage) return (<ErrorMessage errorMessage={ingredientsErrorMessage}/>)
    if (cartErrorMessage) return (<ErrorMessage errorMessage={cartErrorMessage}/>)
    return (
        <div className={appStyles.wrapper}>
            <AppHeader/>
            <Routes location={state?.backgroundLocation || location}>
                <Route path={ROUTE_MAIN} element={<Main/>}/>
                <Route path={ROUTE_LOGIN} element={<Auth/>}/>
                <Route path={ROUTE_REGISTER} element={<Auth/>}/>
                <Route path={ROUTE_FEED} element={<Feed/>}/>
                <Route path={ROUTE_FEED + '/:id'} element={<FeedOrderDetails/>}/>
                <Route path={ROUTE_INGREDIENTS + '/:id'} element={<Ingredients/>}/>
                <Route path={ROUTE_PROFILE} element={
                    <ProtectedAuthorizedRoute>
                        <Profile/>
                    </ProtectedAuthorizedRoute>
                }>
                    <Route path="" element={<ProfileInfo/>}/>
                    <Route path={ROUTE_ORDERS} element={<Orders/>}/>
                </Route>
                <Route path={ROUTE_RESET_PASSWORD} element={
                    <ProtectedUnauthorizedRoute>
                        <ResetPassword/>
                    </ ProtectedUnauthorizedRoute>
                }/>
                <Route path={ROUTE_FORGOT_PASSWORD} element={
                    <ProtectedUnauthorizedRoute>
                        <ForgotPassword/>
                    </ ProtectedUnauthorizedRoute>
                }/>
                <Route path={ROUTE_PROFILE + '/' + ROUTE_ORDERS + '/:id'} element={
                    <ProtectedAuthorizedRoute>
                        <FeedOrderDetails/>
                    </ProtectedAuthorizedRoute>
                }/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
            {state?.backgroundLocation && (
                <Routes>
                    <Route path={ROUTE_FEED + '/:id'} element={<FeedOrderDetails/>} />
                    <Route path={ROUTE_INGREDIENTS + '/:id'} element={<Ingredients/>}/>
                    <Route path={ROUTE_PROFILE + '/' + ROUTE_ORDERS + '/:id'} element={
                        <ProtectedAuthorizedRoute>
                            <FeedOrderDetails/>
                        </ProtectedAuthorizedRoute>
                    }/>
                </Routes>
            )}
            {isShowOrderDetails && (<OrderDetails/>)}
        </div>
    );
}

export default App;
