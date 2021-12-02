import React, {useEffect} from 'react';
import './app.module.css';
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css"
import Main from "../main/main";
import OrderDetails from "../order-details/order-details";
import Preloader from "../preloader/preloader";
import ErrorMessage from "../error-message/error-message";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useAppDispatch} from "../../hooks/redux";
import {fetchIngredients} from "../../services/actions/ingredients-action-creators";
import {useSelector} from "react-redux";
import {getCartErrorMessage, getIsCartLoading, getIsShowOrderDetails} from "../../services/selectors/cart-selector";
import {
    getIngredientsErrorMessage,
    getIsIngredientsLoading,
    getIsShowIngredientDetails
} from "../../services/selectors/ingredients-selectors";

const App = () => {
    const dispatch = useAppDispatch()
    const isShowOrderDetails = useSelector(state => getIsShowOrderDetails(state))
    const isShowIngredientDetails = useSelector(state => getIsShowIngredientDetails(state))
    const isIngredientsLoading = useSelector(state => getIsIngredientsLoading(state))
    const isCartLoading = useSelector(state => getIsCartLoading(state))
    const ingredientsErrorMessage = useSelector(state => getIngredientsErrorMessage(state))
    const cartErrorMessage = useSelector(state => getCartErrorMessage(state))
    useEffect(() => {
        dispatch(fetchIngredients())
    }, [])
    if (isIngredientsLoading || isCartLoading) return (<Preloader/>)
    if (ingredientsErrorMessage) return (<ErrorMessage errorMessage={ingredientsErrorMessage}/>)
    if (cartErrorMessage) return (<ErrorMessage errorMessage={cartErrorMessage}/>)
    return (
        <div className={appStyles.wrapper}>
            <AppHeader/>
            <Main/>
            {isShowOrderDetails && (<OrderDetails/>)}
            {isShowIngredientDetails && (<IngredientDetails/>)}
        </div>
    );
}

export default App;
