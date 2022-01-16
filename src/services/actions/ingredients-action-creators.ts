import {createAsyncThunk} from '@reduxjs/toolkit';
import api from "../../http";

export const fetchIngredients = createAsyncThunk('fetch all ingredients',
    async (_, ThunkAPI) => {
        try {
            const response = await api.getAllIngredients();
            return response;
        } catch (e) {
            return ThunkAPI.rejectWithValue('Не удалось загрузить ингредиенты');
        }
    });
