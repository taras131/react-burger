import {createAsyncThunk} from "@reduxjs/toolkit";
import {checkAuth, forgotPassword, login, LogOut, register, resetPassword, updateUser} from "../../http";

export const fetchRegister = createAsyncThunk(
    'register',
    async (data, ThunkAPI) => {
        try {
            const res = await register(data)
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue('Не удалось зарегистрироваться');
        }
    }
)
export const fetchLogin = createAsyncThunk(
    'login',
    async(user , ThunkAPI) => {
        try {
            const res = await login(user)
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue('Не удалось войти');
        }
    }
)
export const fetchForgotPassword = createAsyncThunk(
    'forgot',
    async(email: string, ThunkAPI) => {
        try{
            const res = await forgotPassword(email)
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue('Пользователя с таким email не существует');
        }
    }
)
export const fetchResetPassword = createAsyncThunk(
    'reset',
    async(data, ThunkAPI) => {
        try{
            const res = await resetPassword(data)
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue('Неверный код');
        }
    }
)
export const fetchCheckAuth = createAsyncThunk(
    'check auth',
    async(_, ThunkAPI) => {
        try{
            const res = await checkAuth()
            if(res.success) return res.user
        } catch (e) {
            return ThunkAPI.rejectWithValue('');
        }
    }
)
export const fetchLogOut = createAsyncThunk(
    'out',
    async(_, ThunkAPI) => {
        try{
            const res = await LogOut()
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue('Не получилось выйти');
        }
    }
)
export const fetchUpdateUser = createAsyncThunk(
    'update user',
    async(user ,ThunkAPI ) => {
        try{
            const res = await updateUser(user)
            return res.user
        } catch (e) {
            return ThunkAPI.rejectWithValue('Не удалось обновить данные');
        }
    }
)
