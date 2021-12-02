import {RootState} from '../store';
import {IIngredientInCart} from '../../models/i-ingredient-in-cart';

export const getCart = (state: RootState) => {
  return state.cart.ingredients;
};
export const getIsShowOrderDetails = (state: RootState) => {
  return state.cart.isShowOrderDetails;
};
export const getOrderNumber = (state: RootState) => {
  return state.cart.order.number;
};
export const getIsCartLoading = (state: RootState) => {
  return state.cart.isLoading;
};
export const getBunInCart = (state: RootState) => {
  return state.cart.ingredients.filter((item) => item.type === 'bun')[0];
};
export const getFillingsInCart = (state: RootState) => {
  return state.cart.ingredients.filter((item) => item.type !== 'bun');
};
export const getTotalSum = (state: RootState) => {
  const cart: IIngredientInCart[] = state.cart.ingredients;
  return cart.reduce((sum: number, cur: IIngredientInCart) => {
    if (cur.type === 'bun') return sum + cur.price * 2;
    return sum + cur.price;
  }, 0);
};
export const getCountInCartById = (state: RootState, id: string) => {
  const ingredients: IIngredientInCart[] = state.cart.ingredients;
  return ingredients.filter((item) => item._id === id).length;
};
export const getCartErrorMessage = (state: RootState) => {
  return state.cart.errorMessage;
};
