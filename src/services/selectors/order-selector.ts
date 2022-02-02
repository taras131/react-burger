import {RootState} from "../store";
import {IOrder} from "../../models/i-order.types";

export const getOrders = (state: RootState) => {
    return state.order.orders
}
export const getOrderById = (state: RootState, id: any): IOrder => {
    return state.order.orders.filter((item: IOrder) => item._id === id)[0]
}
export const getTotal = (state: RootState): number => {
    return state.order.total
}
export const getTotalToday = (state: RootState): number => {
    return state.order.totalToday
}
export const getNumbersOrdersInProcess = (state: RootState): number[] => {
    const numbers: number[] = []
    state.order.orders.forEach((item: IOrder) => {
        if (item.status !== 'done') numbers.push(item.number)
    })
    return numbers
}
export const getNumbersReadyOrders = (state: RootState): number[] => {
    const numbers: number[] = []
    state.order.orders.forEach((item: IOrder) => {
        if (item.status === 'done') numbers.push(item.number)
    })
    return numbers
}
export const getCountIngredientsInOrder = (state: RootState, ingredientId: any, orderId: any): number => {
    const order = getOrderById(state, orderId)
    return order.ingredients.filter(item => item === ingredientId).length
}
export const getOrderByNumber = (state: RootState, orderNumber: number ): IOrder => {
    return state.order.orders.filter((item: IOrder) => item.number === orderNumber)[0]
}
export const getOrderError = (state: RootState): string => {
    return state.order.error
}
export const getOrderIsLoading = (state: RootState): boolean => {
    return state.order.isLoading
}

