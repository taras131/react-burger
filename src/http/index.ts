import {BEARER_TOKEN_HEADER, SERVER_ERROR_MESSAGE} from "../utils/const";
import {IOrder} from "../models/i-order.types";
import {IIngredient} from "../models/i-ingredient.types";
import {IRegistrationData, TLoginData, TResetPassword} from "../services/actions/auth-action-creators";
import {IUserTypes} from "../models/i-user.types";

const INGREDIENTS_API = '/ingredients'
const ORDERS_API = '/orders'
const REGISTER_API = '/auth/register'
const LOGIN_API = '/auth/login'
const PASSWORD_FORGOT_API = '/password-reset'
const PASSWORD_RESET_API = '/password-reset/reset'
const AUTH_API = '/auth/user'
const LOGOUT_API = '/auth/logout'
const UPDATE_TOKEN_API = '/auth/token'
const ACCESS_TOKEN = 'accessToken'
const REFRESH_TOKEN = 'refreshToken'

type TDecodedAuthResponse = {
    accessToken: string
    refreshToken: string
    success: boolean
    user: IUserTypes
}
const setLocalStorage = (decodedResponse: TDecodedAuthResponse) => {
    localStorage.setItem(ACCESS_TOKEN, decodedResponse.accessToken.split(' ')[1])
    localStorage.setItem(REFRESH_TOKEN, decodedResponse.refreshToken)
}
const cleanLocalStorage = () => {
    localStorage.removeItem(REFRESH_TOKEN)
    localStorage.removeItem(ACCESS_TOKEN)
}

class Api {
    _token: string | null;
    _refreshToken: string | null;

    constructor(token: string | null, refreshToken: string | null) {
        this._token = token;
        this._refreshToken = refreshToken;
    }

    getAllIngredients = async (): Promise<Array<IIngredient>> => {
        const res = await fetch(process.env.REACT_APP_API_URL + INGREDIENTS_API)
        if (res.ok) {
            const decodedResponse = await res.json()
            return decodedResponse.data
        }
        throw new Error(SERVER_ERROR_MESSAGE)
    }

    createNewOrder = async (cart: Array<string>): Promise<IOrder> => {
        const res = await fetch(process.env.REACT_APP_API_URL + ORDERS_API, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: BEARER_TOKEN_HEADER + this._token
            },
            body: JSON.stringify({ingredients: cart})
        })
        const decodedResponse = await res.json()
        if (res.ok) {
            return decodedResponse.order
        }
        if (decodedResponse.message === 'jwt expired') {
            await this.updateToken()
            return await this.createNewOrder(cart)
        } else {
            throw new Error(SERVER_ERROR_MESSAGE)
        }
    }

    register = async (user: IRegistrationData): Promise<IUserTypes> => {
        const res = await fetch(process.env.REACT_APP_API_URL + REGISTER_API, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        const decodedResponse = await res.json()
        if (res.ok) {
            setLocalStorage(decodedResponse)
            return decodedResponse.user
        }
        throw new Error(decodedResponse.message)
    }

    login = async (user: TLoginData): Promise<IUserTypes> => {
        const res = await fetch(process.env.REACT_APP_API_URL + LOGIN_API, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        const decodedResponse = await res.json()
        if (res.ok) {
            setLocalStorage(decodedResponse)
            return decodedResponse.user
        }
        throw new Error(decodedResponse.message)

    }

    forgotPassword = async (email: string) => {
        const res = await fetch(process.env.REACT_APP_API_URL + PASSWORD_FORGOT_API, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email: email})
        })
        const decodedResponse = await res.json()
        if (res.ok && decodedResponse.success) {
            return decodedResponse
        }
        throw new Error(decodedResponse.message)
    }

    resetPassword = async (data: TResetPassword) => {
        const res = await fetch(process.env.REACT_APP_API_URL + PASSWORD_RESET_API, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({password: data.password, token: data.key})
        })
        const decodedResponse = await res.json()
        if (res.ok) {
            return decodedResponse.user
        }
        throw new Error(decodedResponse.message)
    }

    checkAuth = async (): Promise<IUserTypes> => {
        if (this._token) {
            const res = await fetch(process.env.REACT_APP_API_URL + AUTH_API, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: BEARER_TOKEN_HEADER + this._token
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            })
            const decodedResponse = await res.json()
            if (res.ok) {
                return decodedResponse.user
            }
            if (decodedResponse.message === 'jwt expired') {
                await this.updateToken()
                return await this.checkAuth()
            }
            throw new Error(decodedResponse.message)
        }
        throw new Error()
    }

    LogOut = async () => {
        const res = await fetch(process.env.REACT_APP_API_URL + LOGOUT_API, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: this._refreshToken})
        })
        const decodedResponse = await res.json()
        if (res.ok) {
            cleanLocalStorage()
            return decodedResponse
        }
        throw new Error(decodedResponse.message)
    }

    updateUser = async (user: IRegistrationData): Promise<IUserTypes> => {
        const res = await fetch(process.env.REACT_APP_API_URL + AUTH_API, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: BEARER_TOKEN_HEADER + this._token
            },
            body: JSON.stringify(user)
        })
        const decodedResponse = await res.json()
        if (res.ok) {
            return decodedResponse
        }
        if (decodedResponse.message === 'jwt expired') {
            await this.updateToken()
            return await this.updateUser(user)
        } else {
            throw new Error(decodedResponse.message)
        }
    }

    updateToken = async () => {
        if (this._refreshToken) {
            const res = await fetch(process.env.REACT_APP_API_URL + UPDATE_TOKEN_API, {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({token: this._refreshToken})
                }
            )
            if (res.ok) {
                const decodedResponse = await res.json()
                if (decodedResponse.success) {
                    setLocalStorage(decodedResponse)
                } else {
                    throw new Error(SERVER_ERROR_MESSAGE)
                }
            }
        }
    }
}

const token: string | null = localStorage.getItem(ACCESS_TOKEN)
const refreshToken: string | null = localStorage.getItem(REFRESH_TOKEN)
const api = new Api(token, refreshToken);

export default api;

