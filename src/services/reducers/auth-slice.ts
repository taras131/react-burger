import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/i-user";
import {
    fetchCheckAuth,
    fetchForgotPassword,
    fetchLogin, fetchLogOut,
    fetchRegister,
    fetchResetPassword
} from "../actions/auth-action-creators";

interface AuthState {
    isLoading: boolean,
    isAuth: boolean,
    user: IUser,
    errorMessage: string,
    canResetPassword: boolean
}

const initialState: AuthState = {
    isLoading: false,
    isAuth: false,
    user: {
        name: '',
        email: ''
    },
    errorMessage: '',
    canResetPassword: false
}
export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchRegister.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAuth = true
            state.isLoading = false;
        },
        [fetchRegister.pending.type]: (state) => {
            state.isLoading = true
            state.errorMessage = '';
        },
        [fetchRegister.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
        [fetchLogin.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAuth = true
            state.isLoading = false;
        },
        [fetchLogin.pending.type]: (state) => {
            state.isLoading = true
            state.errorMessage = '';
        },
        [fetchLogin.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
        [fetchForgotPassword.fulfilled.type]: (state) => {
            state.canResetPassword = true
            state.isLoading = false;
        },
        [fetchForgotPassword.pending.type]: (state) => {
            state.isLoading = true
            state.errorMessage = '';
        },
        [fetchForgotPassword.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
        [fetchResetPassword.fulfilled.type]: (state) => {
            state.canResetPassword = false
            state.isLoading = false;
        },
        [fetchResetPassword.pending.type]: (state) => {
            state.isLoading = true
            state.errorMessage = '';
        },
        [fetchResetPassword.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
        [fetchCheckAuth.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            console.log(action.payload)
            state.user = action.payload
            state.isAuth = true
            state.isLoading = false;
        },
        [fetchCheckAuth.pending.type]: (state) => {
            state.isLoading = true
            state.errorMessage = '';
        },
        [fetchCheckAuth.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
        [fetchLogOut.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            console.log(action.payload)
            state.user = {
                name: '',
                email: ''
            }
            state.isAuth = false
            state.isLoading = false;
        },
        [fetchLogOut.pending.type]: (state) => {
            state.isLoading = true
            state.errorMessage = '';
        },
        [fetchLogOut.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
    }
})

export default AuthSlice.reducer;