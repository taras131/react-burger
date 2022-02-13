import {createAsyncThunk} from '@reduxjs/toolkit';
import {IIngredient} from '../../models/i-ingredient.types';
import api from "../../http";

export const fetchCreateOrder = createAsyncThunk(
    'fetch_create_order',
    async (cart: IIngredient[], ThunkAPI) => {
        try {
            const cartId = cart.map((item) => item._id);
            const response = await api.createNewOrder(cartId);
            return response.number;
        } catch (e) {
            return ThunkAPI.rejectWithValue('Не удалось создать заказ');
        }
    },
);
