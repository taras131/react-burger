import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IOrderState {
    success: boolean
    total: number
    totalToday: number
    orders: any;

}

const initialState: IOrderState = {
    success: false,
    total: 0,
    totalToday: 0,
    orders: [],
};

export const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<any>) => {

            console.log(action.payload)
            state.success = action.payload.success
            state.total = action.payload.total
            state.totalToday = action.payload.totalToday
            state.orders = action.payload.orders
        }
    },
    extraReducers: {},
});

export const {setOrders} = OrderSlice.actions;
export default OrderSlice.reducer;
