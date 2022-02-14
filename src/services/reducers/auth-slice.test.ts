import reducer, {removeError, initialState} from "./auth-slice"
import type {AnyAction} from "@reduxjs/toolkit"
import {IUserTypes} from "../../models/i-user.types";

const user: IUserTypes = {
    name: "Anna",
    email: "anna@mail.ru",
}
describe.only("Redux auth slice", () => {
    test("Should be return the initial state", () => {
        expect(reducer(undefined, {} as AnyAction)).toEqual(initialState)
    })
    test("Should be remove errorMessage", () => {
        const init = {...initialState, errorMessage: "error"}
        expect(reducer(init, removeError)).toEqual(initialState);
    });
    test("Should be added user fetchRegister fulfilled", () => {
        const newState = reducer(initialState, {type: "register/fulfilled",payload: user})
        expect(newState.user).toEqual(user);
    })
    test("Should be true in isLoading fetchRegister pending", () => {
        const newState = reducer(initialState, {type: "register/pending"})
        expect(newState.isLoading).toEqual(true);
    })
    test("Should be text in errorMessage fetchRegister rejected", () => {
        const newState = reducer(initialState, {type: "register/rejected",payload: "error"})
        expect(newState.errorMessage).toEqual("error");
    })

    test("Should be added user fetchLogin fulfilled", () => {
        const newState = reducer(initialState, {type: "login/fulfilled",payload: user})
        expect(newState.user).toEqual(user);
    })
    test("Should be true in isLoading fetchLogin pending", () => {
        const newState = reducer(initialState, {type: "login/pending"})
        expect(newState.isLoading).toEqual(true);
    })
    test("Should be text in errorMessage fetchLogin rejected", () => {
        const newState = reducer(initialState, {type: "login/rejected",payload: "error"})
        expect(newState.errorMessage).toEqual("error");
    })

    test("Should be canResetPassword is true fetchForgotPassword fulfilled", () => {
        const newState = reducer(initialState, {type: "forgot/fulfilled"})
        expect(newState.canResetPassword).toEqual(true);
    })
    test("Should be true in isLoading fetchForgotPassword pending", () => {
        const newState = reducer(initialState, {type: "forgot/pending"})
        expect(newState.isLoading).toEqual(true);
    })
    test("Should be text in errorMessage fetchForgotPassword rejected", () => {
        const newState = reducer(initialState, {type: "forgot/rejected",payload: "error"})
        expect(newState.errorMessage).toEqual("error");
    })

    test("Should be canResetPassword is true fetchResetPassword fulfilled", () => {
        const init = {...initialState, canResetPassword: true}
        const newState = reducer(init, {type: "reset/fulfilled"})
        expect(newState.canResetPassword).toEqual(false);
    })
    test("Should be true in isLoading fetchResetPassword pending", () => {
        const newState = reducer(initialState, {type: "reset/pending"})
        expect(newState.isLoading).toEqual(true);
    })
    test("Should be text in errorMessage fetchResetPassword rejected", () => {
        const newState = reducer(initialState, {type: "reset/rejected",payload: "error"})
        expect(newState.errorMessage).toEqual("error");
    })

    test("Should be isAuth is true fetchCheckAuth fulfilled", () => {
        const newState = reducer(initialState, {type: "check_auth/fulfilled",payload: user})
        expect(newState.isAuth).toEqual(true);
    })
    test("Should be true in isLoading fetchCheckAuth pending", () => {
        const newState = reducer(initialState, {type: "check_auth/pending"})
        expect(newState.isLoading).toEqual(true);
    })
    test("Should be text in errorMessage fetchCheckAuth rejected", () => {
        const newState = reducer(initialState, {type: "check_auth/rejected",payload: "error"})
        expect(newState.errorMessage).toEqual("error");
    })

    test("Should be isAuth is false fetchLogOut fulfilled", () => {
        const init = {...initialState, isAuth: true}
        const newState = reducer(init, {type: "out/fulfilled",payload: user})
        expect(newState.isAuth).toEqual(false);
    })
    test("Should be true in isLoading fetchLogOut pending", () => {
        const newState = reducer(initialState, {type: "out/pending"})
        expect(newState.isLoading).toEqual(true);
    })
    test("Should be text in errorMessage fetchLogOut rejected", () => {
        const newState = reducer(initialState, {type: "out/rejected",payload: "error"})
        expect(newState.errorMessage).toEqual("error");
    })

    test("Should be isAuth is false fetchUpdateUser fulfilled", () => {
        const init = {...initialState, isAuth: true}
        const newState = reducer(init, {type: "update_user/fulfilled",payload: user})
        expect(newState.user).toEqual(user);
    })
    test("Should be true in isLoading fetchUpdateUser pending", () => {
        const newState = reducer(initialState, {type: "update_user/pending"})
        expect(newState.isLoading).toEqual(true);
    })
    test("Should be text in errorMessage fetchUpdateUser rejected", () => {
        const newState = reducer(initialState, {type: "update_user/rejected",payload: "error"})
        expect(newState.errorMessage).toEqual("error");
    })
})