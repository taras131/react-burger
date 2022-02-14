import reducer, {
    initialState,
    addToCart,
    removeFromCart,
    closeOrderDetailModal,
    moveConstructorItem
} from "./cart-slice";
import {AnyAction} from "@reduxjs/toolkit";
import {ICartTypes} from "../../models/i-cart.types";

const ingredients: ICartTypes[] = [
    {
        _id: "60d3b41abdacab0026a733c9",
        name: "Мясо бессмертных моллюсков Protostomia",
        type: "main",
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: "https://code.s3.yandex.net/react/code/meat-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
        key: 1644663303056,
        __v: 1
    },
    {
        _id: "60d3b41abdacab0026a733cd",
        name: "Соус фирменный Space Sauce",
        type: "sauce",
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        key: 1644663303058,
        __v: 0,

    },
    {
        _id: "60d3b41abdacab0026a733cd",
        name: "Соус фирменный Space Sauce",
        type: "sauce",
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        key: 1644663303060,
        __v: 0,

    }
]
describe.only("Redux cart slice", () => {
    test("Should be return the initial state", () => {
        expect(reducer(undefined, {} as AnyAction)).toEqual(initialState)
    })
    test("Should be added ingredient to cart", () => {
        const newState = reducer(initialState, addToCart(ingredients[0]))
        expect(newState.ingredients[0]).toEqual(ingredients[0]);
    })
    test("Should be remove ingredient from cart", () => {
        const init = {...initialState, ingredients: ingredients}
        const newState = reducer(init, removeFromCart(1644663303058))
        expect(newState.ingredients.length).toEqual(2);
    })
    test("Should be isShowOrderDetails is false", () => {
        const init = {...initialState, isShowOrderDetails: true}
        const newState = reducer(init, closeOrderDetailModal)
        expect(newState.isShowOrderDetails).toEqual(false);
    })
    test("Should be move ingredient in cart", () => {
        const init = {...initialState, ingredients: ingredients}
        const newState = reducer(init, moveConstructorItem({hover: 0, drag: 2}))
        expect(newState.ingredients[0].key).toEqual(1644663303060);
    })
    test("Should be isAuth is false fetchCreateOrder fulfilled", () => {
        const init = {...initialState, ingredients: ingredients}
        const newState = reducer(init, {type: "fetch_create_order/fulfilled",payload: "23423662"})
        expect(newState.ingredients.length).toEqual(0);
        expect(newState.order.number).toEqual("23423662");
    })
    test("Should be true in isLoading fetchCreateOrder pending", () => {
        const newState = reducer(initialState, {type: "fetch_create_order/pending"})
        expect(newState.isLoading).toEqual(true);
    })
    test("Should be text in errorMessage fetchCreateOrder rejected", () => {
        const newState = reducer(initialState, {type: "fetch_create_order/rejected",payload: "error"})
        expect(newState.errorMessage).toEqual("error");
    })
})