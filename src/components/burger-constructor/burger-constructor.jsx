import React, {useContext, useEffect, useReducer} from 'react';
import constructorStyle from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {CartContext} from "../../services/contexts";

const CALCULATE_SUM = "CALCULATE_SUM"
const initialState = {totalSum: 0}
const reducer = (state, action) => {
    switch (action.type) {
        case CALCULATE_SUM:
            return ({
                ...state, totalSum: action.payload.ingredients.reduce((sum, current) => {
                    return sum + current.price
                }, 0) + 2 * action.payload.bun.price
            })
        default:
            return state
    }
}
const BurgerConstructor = () => {
    const {cart, createOrder, removeItemFromCart} = useContext(CartContext)
    const [state, dispatch] = useReducer(reducer, initialState, undefined)
    useEffect(() => {
        dispatch({type: CALCULATE_SUM, payload: cart})
    }, [cart])
    const order = cart.ingredients.filter(ingredient => ingredient.type !== "bun")
    const orderItems = order.map(item => {
        return (
            <li key={item._id} className={constructorStyle.order_item + " pr-2"}>
                <DragIcon type="primary"/>
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image_mobile}
                    handleClose={() => removeItemFromCart(item._id)}
                />
            </li>
        )
    })
    return (
        <section className={constructorStyle.wrapper}>
            <div className={constructorStyle.order_wrapper + " mt-25"}>
                <div className={constructorStyle.order_item + " pr-4"}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={cart.bun.name + " (верх)"}
                        price={cart.bun.price}
                        thumbnail={cart.bun.image_mobile}
                    />
                </div>
                <ul className={constructorStyle.order_items}>
                    {orderItems}
                </ul>
                <div className={constructorStyle.order_item + " pr-4"}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={cart.bun.name + " (низ)"}
                        price={cart.bun.price}
                        thumbnail={cart.bun.image_mobile}
                    />
                </div>
                <div className={constructorStyle.create_order_section + " pr-4 mt-10"}>
                    <p className="text text_type_digits-default mr-2">{state.totalSum}</p>
                    <div className={constructorStyle.icon_section + " mr-4"}>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary" size="medium"
                            onClick={() => createOrder()}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default BurgerConstructor;