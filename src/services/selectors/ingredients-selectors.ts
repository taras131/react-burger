import {RootState} from '../store';

export const getAllIngredients = (state: RootState) => {
  return state.ingredients.ingredients;
};
export const getIngredientsByType = (state: RootState, type: string) => {
  return state.ingredients.ingredients.filter((item) => item.type === type);
};
export const getIsIngredientsLoading = (state: RootState) => {
  return state.ingredients.isLoading;
};
export const getIngredientsErrorMessage = (state: RootState) => {
  return state.ingredients.errorMessage;
};
