import {createAsyncThunk} from '@reduxjs/toolkit';
import {IIngredient} from '../../models/i-ingredient';
import {createNewOrder} from '../../http';

export const fetchCreateOrder = createAsyncThunk(
    'fetch create order',
    async (cart: IIngredient[], ThunkAPI) => {
      try {
        const cartId = cart.map((item) => item._id);
        const response = await createNewOrder(cartId);
        return response.order.number;
      } catch (e) {
        ThunkAPI.rejectWithValue('Не удалось создать заказ');
      }
    },
);
