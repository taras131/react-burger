import {
    fetchCheckAuth,
    fetchForgotPassword,
    fetchLogin,
    fetchLogOut,
    fetchRegister,
    fetchResetPassword,
    fetchUpdateUser
} from "./auth-action-creators";

describe.only("Auth action creators", () => {
    test("creates the action fetchRegister", () => {
        expect(fetchRegister.fulfilled.type).toEqual("register/fulfilled")
        expect(fetchRegister.pending.type).toEqual("register/pending")
        expect(fetchRegister.rejected.type).toEqual("register/rejected")
    })
    test("exposes the typePrefix it was created with fetchRegister", () => {
        expect(fetchRegister.typePrefix).toEqual("register")
    })
    test("creates the action fetchLogin", () => {
        expect(fetchLogin.fulfilled.type).toEqual("login/fulfilled")
        expect(fetchLogin.pending.type).toEqual("login/pending")
        expect(fetchLogin.rejected.type).toEqual("login/rejected")
    })
    test("exposes the typePrefix it was created with fetchLogin", () => {
        expect(fetchLogin.typePrefix).toEqual("login")
    })
    test("creates the action fetchForgotPassword", () => {
        expect(fetchForgotPassword.fulfilled.type).toEqual("forgot/fulfilled")
        expect(fetchForgotPassword.pending.type).toEqual("forgot/pending")
        expect(fetchForgotPassword.rejected.type).toEqual("forgot/rejected")
    })
    test("exposes the typePrefix it was created with fetchForgotPassword", () => {
        expect(fetchForgotPassword.typePrefix).toEqual("forgot")
    })
    test("creates the action fetchResetPassword", () => {
        expect(fetchResetPassword.fulfilled.type).toEqual("reset/fulfilled")
        expect(fetchResetPassword.pending.type).toEqual("reset/pending")
        expect(fetchResetPassword.rejected.type).toEqual("reset/rejected")
    })
    test("exposes the typePrefix it was created with fetchForgotPassword", () => {
        expect(fetchForgotPassword.typePrefix).toEqual("forgot")
    })
    test('creates the action fetchCheckAuth', () => {
        expect(fetchCheckAuth.fulfilled.type).toEqual("check_auth/fulfilled")
        expect(fetchCheckAuth.pending.type).toEqual("check_auth/pending")
        expect(fetchCheckAuth.rejected.type).toEqual("check_auth/rejected")
    })
    test("exposes the typePrefix it was created with fetchCheckAuth", () => {
        expect(fetchCheckAuth.typePrefix).toEqual("check_auth")
    })
    test("creates the action fetchLogOut", () => {
        expect(fetchLogOut.fulfilled.type).toEqual("out/fulfilled")
        expect(fetchLogOut.pending.type).toEqual("out/pending")
        expect(fetchLogOut.rejected.type).toEqual("out/rejected")
    })
    test("exposes the typePrefix it was created with fetchLogOut", () => {
        expect(fetchLogOut.typePrefix).toEqual("out")
    })
    test('creates the action fetchUpdateUser', () => {
        expect(fetchUpdateUser.fulfilled.type).toEqual("update_user/fulfilled")
        expect(fetchUpdateUser.pending.type).toEqual("update_user/pending")
        expect(fetchUpdateUser.rejected.type).toEqual("update_user/rejected")
    })
    test("exposes the typePrefix it was created with fetchUpdateUser", () => {
        expect(fetchUpdateUser.typePrefix).toEqual("update_user")
    })
})