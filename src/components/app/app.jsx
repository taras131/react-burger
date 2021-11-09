import React, {useEffect, useState} from 'react';
import './app.module.css';
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css"
import Main from "../main/main";
import {getAllIngredients} from "../../http";
import OrderDetails from "../order-details/order-details";
import Preloader from "../preloader/preloader";
import ErrorMessage from "../error-message/error-message";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {CONNECT_ERROR_MESSAGE, SERVER_ERROR_MESSAGE} from "../../utils/const";

const App = () => {
    const [data, setData] = useState({
        ingredients: [],
        isLoading: true,
        errorMessage: '',
        isShowOrderDetails: false,
        isShowIngredientDetails: false,
        currentIngredient: null,
        order: {
            number: "034536"
        }
    })
    const toggleIsShowOrderDetails = () => {
        setData({...data, isShowOrderDetails: !data.isShowOrderDetails})
    }
    const openIngredientDetailsModal = (ingredient) => {
        setData({...data, isShowIngredientDetails: true, currentIngredient: ingredient})
    }
    const closeIngredientDetailsModal = () => {
        setData({...data, isShowIngredientDetails: false, currentIngredient: null})
    }
    useEffect(() => {
        setData({...data, errorMessage: '', isLoading: true})
        getAllIngredients()
            .then(response => {
                if (response === 'error') {
                    setData({...data, errorMessage: SERVER_ERROR_MESSAGE, isLoading: false})
                } else {
                    setData({...data, ingredients: response, isLoading: false})
                }
            })
            .catch(error => setData({...data, errorMessage: CONNECT_ERROR_MESSAGE, isLoading: false}))
    }, [])
    if (data.isLoading) return <Preloader/>
    if (data.errorMessage) return <ErrorMessage errorMessage={data.errorMessage}/>
    return (
        <div className={appStyles.wrapper}>
            <AppHeader/>
            <Main ingredientsData={data.ingredients}
                  openOrderDetailsModal={toggleIsShowOrderDetails}
                  openIngredientDetailsModal={openIngredientDetailsModal}/>
            {data.isShowOrderDetails && (<OrderDetails closeModal={toggleIsShowOrderDetails}
                                                       order={data.order}/>)}
            {data.isShowIngredientDetails && (<IngredientDetails closeModal={closeIngredientDetailsModal}
                                                                 ingredient={data.currentIngredient}/>)}
        </div>
    );
}

export default App;
