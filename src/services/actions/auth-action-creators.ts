import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../http";

export type TResetPassword = {
    password: string,
    key: string
}

export interface IRegistrationData {
    name: string
    email: string
    password: string
}

export type TLoginData = Omit<IRegistrationData, 'name'>

const handlerError = (e: any) => {
    if (e instanceof Error && e.message) return e.message;
    return 'неизвестная ошибка';
}
export const fetchRegister = createAsyncThunk(
    'register',
    async (data: IRegistrationData, ThunkAPI) => {
        try {
            const res = await api.register(data)
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e))
        }
    }
)
export const fetchLogin = createAsyncThunk(
    'login',
    async (user: TLoginData, ThunkAPI) => {
        try {
            const res = await api.login(user)
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e))
        }
    }
)
export const fetchForgotPassword = createAsyncThunk(
    'forgot',
    async (email: string, ThunkAPI) => {
        try {
            const res = await api.forgotPassword(email)
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e))
        }
    }
)
export const fetchResetPassword = createAsyncThunk(
    'reset',
    async (data: TResetPassword, ThunkAPI) => {
        try {
            const res = await api.resetPassword(data)
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e))
        }
    }
)
export const fetchCheckAuth = createAsyncThunk(
    'check auth',
    async (_, ThunkAPI) => {
        try {
            return await api.checkAuth()
        } catch (e) {
            return ThunkAPI.rejectWithValue('')
        }
    }
)
export const fetchLogOut = createAsyncThunk(
    'out',
    async (_, ThunkAPI) => {
        try {
            const res = await api.LogOut()
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e))
        }
    }
)
export const fetchUpdateUser = createAsyncThunk(
    'update user',
    async (user: IRegistrationData, ThunkAPI) => {
        try {
            const res = await api.updateUser(user)
            return res
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e))
        }
    }
)
