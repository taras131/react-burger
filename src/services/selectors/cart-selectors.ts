import {RootState} from '../store';
import {ICartTypes} from "../../models/i-cart.types";

export const getCart = (state: RootState): ICartTypes[]  => {
    return state.cart.ingredients;
};
export const getIsShowOrderDetails = (state: RootState): boolean => {
    return state.cart.isShowOrderDetails;
};
export const getOrderNumber = (state: RootState): string => {
    return state.cart.order.number;
};
export const getIsCartLoading = (state: RootState): boolean => {
    return state.cart.isLoading;
};
export const getBunInCart = (state: RootState): ICartTypes | null => {
    try {
        return state.cart.ingredients.filter((item) => item.type === 'bun')[0];
    } catch (e) {
        return null
    }
};
export const getNotBunIngredients = (state: RootState): ICartTypes[] | null => {
    try {
        return state.cart.ingredients.filter((item) => item.type !== 'bun');
    } catch (e) {
        return null
    }
};
export const getTotalSum = (state: RootState): number => {
    try {
        const cart: ICartTypes[] = state.cart.ingredients;
        return cart.reduce((sum: number, cur: ICartTypes) => {
            return sum + cur.price;
        }, 0)
    } catch (e) {
        return 0
    }
};
export const getCountInCartById = (state: RootState, id: string): number => {
    try {
        const ingredients: ICartTypes[] = state.cart.ingredients;
        return ingredients.filter((item) => item._id === id).length;
    } catch (e) {
        return 0
    }

};
export const getCartErrorMessage = (state: RootState): string => {
    return state.cart.errorMessage;
};
