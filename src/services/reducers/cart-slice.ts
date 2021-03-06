import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchCreateOrder} from '../actions/cart-action-creators';
import {ICartTypes, IOrderNumber} from "../../models/i-cart.types";


interface CartState {
  isLoading: boolean;
  errorMessage: string;
  isShowOrderDetails: boolean;
  ingredients: ICartTypes[] | [];
  order: IOrderNumber;
}

interface IKeys {
  hover: number;
  drag: number;
}

export const initialState: CartState = {
  isLoading: false,
  errorMessage: '',
  isShowOrderDetails: false,
  ingredients: [],
  order: {
    number: '',
  },
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartTypes>) => {
      if (action.payload.type === 'bun') {
          state.ingredients = [...state.ingredients.filter(item => item.type !== 'bun'), action.payload];
      } else {
          const arr: ICartTypes[] = [action.payload]
          state.ingredients = arr.concat(state.ingredients);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.ingredients = state.ingredients.filter((item) => item.key !== action.payload);
    },
    closeOrderDetailModal: (state) => {
      state.isShowOrderDetails = false;
    },
    moveConstructorItem: (state, action: PayloadAction<IKeys>) => {
      [state.ingredients[action.payload.drag], state.ingredients[action.payload.hover]] = [
        state.ingredients[action.payload.hover],
        state.ingredients[action.payload.drag],
      ];
    },
  },
  extraReducers: {
    [fetchCreateOrder.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.order.number = action.payload;
      state.isShowOrderDetails = true;
      state.ingredients = [];
      state.isLoading = false;
    },
    [fetchCreateOrder.pending.type]: (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    },
    [fetchCreateOrder.rejected.type]: (state, action: PayloadAction<string>) => {
      state.order.number = '';
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const {addToCart, removeFromCart, closeOrderDetailModal, moveConstructorItem} =
  CartSlice.actions;
export default CartSlice.reducer;
