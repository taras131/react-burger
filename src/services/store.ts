import {combineReducers,applyMiddleware} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredients-slice';
import cartReducer from './reducers/cart-slice';
import AuthReducer from './reducers/auth-slice';
import OrderReducer from './reducers/order-slice';
import {ordersMiddleware} from "./middleware/orders-middleware";

const wsUrl = 'wss://norma.nomoreparties.space/api/orders'

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cart: cartReducer,
  auth: AuthReducer,
  order: OrderReducer,
});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ordersMiddleware)

  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
