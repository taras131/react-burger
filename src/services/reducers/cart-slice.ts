import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IOrder} from '../../models/i-order';
import {IIngredient} from '../../models/i-ingredient';
import {fetchCreateOrder} from '../actions/cart-action-creators';
import {IIngredientInCart} from '../../models/i-ingredient-in-cart';

interface CartState {
  isLoading: boolean;
  errorMessage: string;
  isShowOrderDetails: boolean;
  ingredients: IIngredientInCart[] | [];
  order: IOrder;
}

interface IKeys {
  hover: number;
  drag: number;
}

const initialState: CartState = {
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
    addToCart: (state, action: PayloadAction<IIngredient>) => {
      const isThereBuninCart = state.ingredients.filter((item) => item.type === 'bun').length;
      if (action.payload.type !== 'bun' || !isThereBuninCart) {
        state.ingredients = [
          ...state.ingredients,
          {...action.payload, key: new Date().valueOf()},
        ];
      } else {
        state.ingredients = [
          ...state.ingredients.filter((item) => item.type !== 'bun'),
          {...action.payload, key: new Date().valueOf()},
        ];
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
