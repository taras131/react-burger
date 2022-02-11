import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IOrder} from "../../models/i-order.types";
import {fetchOrderInfo} from "../actions/order-action-creators";

interface ISetOrdersPayload {
    orders: IOrder[],
    total: number,
    totalToday: number,
}
interface IOrderState {
    total: number,
    totalToday: number,
    orders: IOrder[],
    currentOrder: IOrder| null,
    isWsConnecting: boolean,
    error: string,
    isLoading: boolean
}

const initialState: IOrderState = {
    total: 0,
    totalToday: 0,
    orders: [],
    currentOrder: null,
    isWsConnecting: false,
    error: '',
    isLoading: false
};

export const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        startConnecting: (state) => {
            state.isWsConnecting = true
            state.error = ''
        },
        stopConnecting: (state) => {
            state.isWsConnecting = false
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        setOrders: (state, action: PayloadAction<ISetOrdersPayload>) => {
            state.error = ''
            state.total = action.payload.total
            state.totalToday = action.payload.totalToday
            state.orders = action.payload.orders
        },
        cleanOrders: (state) => {
            state.orders = []
        }
    },
    extraReducers: {
        [fetchOrderInfo.fulfilled.type]: (state, action: PayloadAction<IOrder>) => {
            state.currentOrder = action.payload;
            state.isLoading = false
        },
        [fetchOrderInfo.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchOrderInfo.rejected.type]: (state, action: PayloadAction<string>) => {
            state.currentOrder = null;
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const orderActions = OrderSlice.actions;
export default OrderSlice.reducer;
