import React, {useEffect, useState} from 'react';
import './app.module.css';
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css"
import Main from "../main/main";
import {createNewOrder, getAllIngredients} from "../../http";
import OrderDetails from "../order-details/order-details";
import Preloader from "../preloader/preloader";
import ErrorMessage from "../error-message/error-message";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {CONNECT_ERROR_MESSAGE} from "../../utils/const";
import {CartContext, OrderContext, IngredientsContext} from "../../services/contexts";

const App = () => {
    const [data, setData] = useState({
        ingredients: [],
        isLoading: true,
        errorMessage: '',
        isShowOrderDetails: false,
        isShowIngredientDetails: false,
        currentIngredient: null,
        cart: {
            bun: null,
            ingredients: []
        },
        order: {
            number: ""
        }
    })
    const toggleIsShowOrderDetails = () => {
        setData(prev => ({...prev, isShowOrderDetails: !data.isShowOrderDetails}))
    }
    const openIngredientDetailsModal = (ingredient) => {
        setData(prev => ({...prev, isShowIngredientDetails: true, currentIngredient: ingredient}))
    }
    const closeIngredientDetailsModal = () => {
        setData(prev => ({...prev, isShowIngredientDetails: false, currentIngredient: null}))
    }
    const createOrder = () => {
        setData(prev => ({...prev, errorMessage: '', isLoading: true}))
        const bunId = data.cart.bun._id
        const ingredientsId = data.cart.ingredients.map(item => item._id)
        createNewOrder([...ingredientsId, bunId]).then(response => {
            setData(prev => ({...prev, order: {number: response.order.number}, isLoading: false}))
            setData(prev => ({...prev, isShowOrderDetails: true}))
        }).catch(e => setData(prev => ({...prev, errorMessage: CONNECT_ERROR_MESSAGE, isLoading: false})))
    }
    const removeItemFromCart = (id) => {
        setData(prev => ({
            ...prev, cart: {
                ...prev.cart, ingredients:
                    [...prev.cart.ingredients.filter(item => item._id !== id)]
            }
        }))
    }
    const getCountInCartById = (id, type) => {
        if (type === "bun") {
            return data.cart.bun._id === id ? 1 : 0
        } else {
            return data.cart.ingredients.filter(item => item._id === id).length
        }
    }
    useEffect(() => {
        setData({...data, errorMessage: '', isLoading: true})
        getAllIngredients()
            .then(response => {
                const bun = response.filter(item => item.type === 'bun')[0]
                const ingredients = response.filter(item => item.type !== 'bun')
                setData(prev => ({...prev, cart: {bun: bun, ingredients: ingredients}}))
                setData(prev => ({...prev, ingredients: response, isLoading: false}))
            })
            .catch(error => setData(prev => ({...prev, errorMessage: CONNECT_ERROR_MESSAGE, isLoading: false})))
    }, [])
    if (data.isLoading) return <Preloader/>
    if (data.errorMessage) return <ErrorMessage errorMessage={data.errorMessage}/>
    return (
        <div className={appStyles.wrapper}>
            <CartContext.Provider value={{
                cart: data.cart,
                createOrder: createOrder,
                removeItemFromCart: removeItemFromCart
            }}>
                <OrderContext.Provider value={{number: data.order.number}}>
                    <IngredientsContext.Provider value={{
                        ingredientsData: data.ingredients,
                        getCountInCartById: getCountInCartById,
                        openIngredientDetailsModal: openIngredientDetailsModal
                    }}>
                        <AppHeader/>
                        <Main/>
                        {data.isShowOrderDetails && (<OrderDetails closeModal={toggleIsShowOrderDetails}/>)}
                        {data.isShowIngredientDetails && (<IngredientDetails closeModal={closeIngredientDetailsModal}
                                                                             ingredient={data.currentIngredient}/>)}
                    </IngredientsContext.Provider>
                </OrderContext.Provider>
            </CartContext.Provider>
        </div>
    );
}

export default App;
