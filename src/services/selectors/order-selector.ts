import {RootState} from "../store";

export const getOrders = (state: RootState) => {
    return state.order.orders
}
export const getTotal = (state: RootState) => {
    return state.order.total
}
export const getTotalToday = (state: RootState) => {
    return state.order.totalToday
}