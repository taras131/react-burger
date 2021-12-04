import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAllIngredients} from '../../http';

export const fetchIngredients = createAsyncThunk('fetch all ingredients',
    async (_, ThunkAPI) => {
        try {
            const response = await getAllIngredients();
            return response;
        } catch (e) {
            return ThunkAPI.rejectWithValue('Не удалось загрузить ингредиенты');
        }
    });
