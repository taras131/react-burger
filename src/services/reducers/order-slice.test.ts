import reducer, {initialState, ISetOrdersPayload, orderActions} from "./order-slice";
import {AnyAction} from "@reduxjs/toolkit";
import {IOrder} from "../../models/i-order.types";

const orders: IOrder[] = [
    {
        _id: "1",
        ingredients: ["231", "1251", "125125"],
        status: "done",
        name: "Бургер",
        number: 22,
        createdAt: "12.02.2007",
        updatedAt: "12.02.2007"
    },
    {
        _id: "2",
        ingredients: ["231", "1251", "125125"],
        status: "done",
        name: "Бургер",
        number: 23,
        createdAt: "12.02.2007",
        updatedAt: "12.02.2007"
    },
    {
        _id: "3",
        ingredients: ["231", "1251", "125125"],
        status: "done",
        name: "Бургер",
        number: 24,
        createdAt: "12.02.2007",
        updatedAt: "12.02.2007"
    },
]
const setOrdersPayload: ISetOrdersPayload = {
    orders: orders,
    total: 12314,
    totalToday: 12,
}
describe.only("Redux order slice", () => {
    test("Should be return the initial state", () => {
        expect(reducer(undefined, {} as AnyAction)).toEqual(initialState)
    })
    test("Should be isWsConnecting is true", () => {
        const newState = reducer(initialState, orderActions.startConnecting)
        expect(newState.isWsConnecting).toEqual(true);
    })
    test("Should be isWsConnecting is false", () => {
        const init = {...initialState, isWsConnecting: true}
        const newState = reducer(init, orderActions.stopConnecting)
        expect(newState.isWsConnecting).toEqual(false);
    })
    test("Should be text in error", () => {
        const newState = reducer(initialState, orderActions.setError("error"))
        expect(newState.error).toEqual("error");
    })
    test("Should be orders length is 3", () => {
        const newState = reducer(initialState, orderActions.setOrders(setOrdersPayload))
        expect(newState.orders.length).toEqual(3);
    })
    test("Should be orders length is 0", () => {
        const init = {...initialState, orders: setOrdersPayload.orders}
        const newState = reducer(init, orderActions.cleanOrders)
        expect(newState.orders.length).toEqual(0);
    })
    test("Should be currentOrder id is 2 fetchCreateOrder fulfilled", () => {
        const newState = reducer(initialState, {type: "fetch_order_info/fulfilled",payload: orders[1]})
        expect(newState.currentOrder && newState.currentOrder._id).toEqual("2");
    })
    test("Should be true in isLoading fetchCreateOrder pending", () => {
        const newState = reducer(initialState, {type: "fetch_order_info/pending"})
        expect(newState.isLoading).toEqual(true);
    })
    test("Should be text in errorMessage fetchCreateOrder rejected", () => {
        const newState = reducer(initialState, {type: "fetch_order_info/rejected",payload: "error"})
        expect(newState.error).toEqual("error");
    })
})