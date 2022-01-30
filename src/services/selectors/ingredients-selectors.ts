import {RootState} from '../store';
import {IIngredient} from "../../models/i-ingredient.types";

export const getAllIngredients = (state: RootState): IIngredient[] => {
    return state.ingredients.ingredients;
};
export const getIngredientsByType = (state: RootState, type: string): IIngredient[] => {
    return state.ingredients.ingredients.filter((item) => item.type === type);
};
export const getIsIngredientsLoading = (state: RootState): boolean => {
    return state.ingredients.isLoading;
};
export const getIngredientsErrorMessage = (state: RootState): string => {
    return state.ingredients.errorMessage;
};
export const getIngredientById = (state: RootState, id: string | undefined): IIngredient => {
    return state.ingredients.ingredients.filter(item => item._id === id)[0]
}
export const getPriceById = (state: RootState, id: string): number => {
    return state.ingredients.ingredients.filter(item => item._id === id)[0].price
}
export const getMobileImagesById = (state: RootState, ingredients: string[]): string[] => {
    let images: string[] = []
    state.ingredients.ingredients.forEach((item: IIngredient) => {
        if (ingredients.includes(item._id)) {
            images.push(item.image_mobile)
        }
    })
    return images
}
export const getAmountByIds = (state: RootState, ingredients: string []): number => {
    let amount = 0
    ingredients.forEach((item) => {
        amount = amount + getPriceById(state, item)
    })
    return amount
}

