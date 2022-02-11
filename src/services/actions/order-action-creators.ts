import {START_ORDERS_LISTENING, STOP_ORDERS_LISTENING} from "../../utils/const";
import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../http";

export const startOrdersListening = (url: string) => ({type: START_ORDERS_LISTENING, payload: url})
export const stopOrdersListening = () => ({type: STOP_ORDERS_LISTENING})
export const fetchOrderInfo = createAsyncThunk(
    'fetch order info',
    async (orderNumber: number, ThunkAPI) => {
        try {
            return await api.getOrderInfo(orderNumber)
        } catch (e) {
            return ThunkAPI.rejectWithValue(e)
        }
    }
)