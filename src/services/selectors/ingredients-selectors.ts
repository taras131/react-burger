import {RootState} from '../store';
import {IIngredient} from "../../models/i-ingredient.types";

export const getAllIngredients = (state: RootState): IIngredient[] => {
  return state.ingredients.ingredients;
};
export const getIngredientsByType = (state: RootState, type: string): IIngredient[]  => {
  return state.ingredients.ingredients.filter((item) => item.type === type);
};
export const getIsIngredientsLoading = (state: RootState): boolean => {
  return state.ingredients.isLoading;
};
export const getIngredientsErrorMessage = (state: RootState): string => {
  return state.ingredients.errorMessage;
};
export const getIngredientById =(state: RootState, id: string | undefined): IIngredient => {
  return state.ingredients.ingredients.filter(item => item._id === id)[0]
}

