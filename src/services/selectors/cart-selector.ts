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
    try {
        return state.cart.ingredients.filter((item) => item.type === 'bun')[0];
    } catch (e) {
        return null
    }
};
export const getNotBunIngredients = (state: RootState) => {
    try {
        return state.cart.ingredients.filter((item) => item.type !== 'bun');
    } catch (e) {
        return null
    }
};
export const getTotalSum = (state: RootState) => {
    try {
        const cart: IIngredientInCart[] = state.cart.ingredients;
        return cart.reduce((sum: number, cur: IIngredientInCart) => {
            return sum + cur.price;
        }, 0)
    } catch (e) {
        return 0
    }
};
export const getCountInCartById = (state: RootState, id: string) => {
    try {
        const ingredients: IIngredientInCart[] = state.cart.ingredients;
        return ingredients.filter((item) => item._id === id).length;
    } catch (e) {
        return 0
    }

};
export const getCartErrorMessage = (state: RootState) => {
    return state.cart.errorMessage;
};
