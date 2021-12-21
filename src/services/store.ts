import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredients-slice';
import cartReducer from './reducers/cart-slice';
import AuthReducer from './reducers/auth-slice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cart: cartReducer,
  auth: AuthReducer,
});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
