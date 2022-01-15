import {RootState} from "../store";
import {IUserTypes} from "../../models/i-user.types";

export const getAuthIsLoading = (state: RootState): boolean => {
    return state.auth.isLoading
}
export const getIsAuth = (state: RootState): boolean => {
    return state.auth.isAuth
}
export const getCanResetPassword = (state: RootState): boolean => {
    return state.auth.canResetPassword
}
export const getUser = (state: RootState): IUserTypes => {
    return state.auth.user
}
export const getAuthErrorMessage = (state: RootState): string => {
    return state.auth.errorMessage
}