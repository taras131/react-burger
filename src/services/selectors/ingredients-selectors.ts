import {RootState} from '../store';

export const getAllIngredients = (state: RootState) => {
  return state.ingredients.ingredients;
};
export const getIngredientsByType = (state: RootState, type: string) => {
  return state.ingredients.ingredients.filter((item) => item.type === type);
};
export const getIsShowIngredientDetails = (state: RootState) => {
  return state.ingredients.isShowIngredientDetails;
};
export const getCurrentIngredient = (state: RootState) => {
  return state.ingredients.currentIngredient;
};
export const getIsIngredientsLoading = (state: RootState) => {
  return state.ingredients.isLoading;
};
export const getIngredientsErrorMessage = (state: RootState) => {
  return state.ingredients.errorMessage;
};
