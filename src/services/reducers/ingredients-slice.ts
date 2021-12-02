import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IIngredient} from '../../models/i-ingredient';
import {fetchIngredients} from '../actions/ingredients-action-creators';

interface IngredientsState {
  ingredients: IIngredient[];
  isLoading: boolean;
  errorMessage: string;
  isShowIngredientDetails: boolean;
  currentIngredient: IIngredient | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: true,
  errorMessage: '',
  isShowIngredientDetails: false,
  currentIngredient: null,
};
const IngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    openIngredientDetailsModal: (state) => {
      state.isShowIngredientDetails = true;
    },
    closeIngredientDetailsModal: (state) => {
      state.isShowIngredientDetails = false;
      state.currentIngredient = null;
    },
    setCurrentIngredient: (state, action: PayloadAction<IIngredient>) => {
      state.currentIngredient = action.payload;
      state.isShowIngredientDetails = true;
    },
  },
  extraReducers: {
    [fetchIngredients.fulfilled.type]: (state, action: PayloadAction<IIngredient[]>) => {
      state.ingredients = action.payload;
      state.isLoading = false;
    },
    [fetchIngredients.pending.type]: (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    },
    [fetchIngredients.rejected.type]: (state, action: PayloadAction<string>) => {
      state.ingredients = [];
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});
export const {closeIngredientDetailsModal, setCurrentIngredient} = IngredientsSlice.actions;
export default IngredientsSlice.reducer;
