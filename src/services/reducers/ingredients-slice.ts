import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IIngredient} from '../../models/i-ingredient.types';
import {fetchIngredients} from '../actions/ingredients-action-creators';

interface IngredientsState {
  ingredients: IIngredient[];
  isLoading: boolean;
  errorMessage: string;
}

export const initialState: IngredientsState = {
  ingredients: [],
  isLoading: true,
  errorMessage: '',
};
const IngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
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

export default IngredientsSlice.reducer;
