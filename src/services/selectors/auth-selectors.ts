import {RootState} from "../store";

export const getAuthIsLoading = (state: RootState) => {
    return state.auth.isLoading
}
export const getIsAuth = (state: RootState) => {
    return state.auth.isAuth
}
export const getCanResetPassword = (state: RootState) => {
    return state.auth.canResetPassword
}
export const getUser = (state: RootState) => {
    return state.auth.user
}
export const getAuthErrorMessage = (state: RootState) => {
    return state.auth.errorMessage
}