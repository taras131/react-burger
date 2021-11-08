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

const App = () => {
    const [data, setData] = useState({
        ingredients: [],
        isLoading: true,
        isError: false,
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
        setData({...data, isError: false, isLoading: true})
        getAllIngredients()
            .then(response => setData({...data, ingredients: response, isLoading: false}))
            .catch(error => setData({...data, isError: true, isLoading: false}))
    }, [])
    if (data.isLoading) return <Preloader/>
    if (data.isError) return <ErrorMessage/>
    return (
        <div className={appStyles.wrapper}>
            <AppHeader/>
            <Main ingredientsData={data.ingredients}
                  openOrderDetailsModal={toggleIsShowOrderDetails}
                  openIngredientDetailsModal={openIngredientDetailsModal}/>
            <div style={{overflow: 'hidden'}}>
                {data.isShowOrderDetails && <OrderDetails closeModal={toggleIsShowOrderDetails}
                                                          order = {data.order}/>}
                {data.isShowIngredientDetails && <IngredientDetails closeModal={closeIngredientDetailsModal}
                                                                    ingredient={data.currentIngredient}/>}
            </div>
        </div>
    );
}

export default App;
