import {BEARER_TOKEN_HEADER, SERVER_ERROR_MESSAGE} from "../utils/const";

export const getAllIngredients = async () => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/ingredients')
    if (res.ok) {
        const decodedResponse = await res.json()
        return decodedResponse.data
    }
    throw new Error(SERVER_ERROR_MESSAGE)
}
export const createNewOrder = async (cart) => {
    const token = localStorage.getItem('accessToken')
    const res = await fetch(process.env.REACT_APP_API_URL + '/orders', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: BEARER_TOKEN_HEADER + token
        },
        body: JSON.stringify({ingredients: cart})
    })
    const decodedResponse = await res.json()
    if (res.ok) {
        return decodedResponse
    }
    if (decodedResponse.message === 'jwt expired') {
        await updateToken()
        await createNewOrder(cart)
    } else {
        throw new Error(SERVER_ERROR_MESSAGE)
    }
}
export const register = async (user) => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/auth/register', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
    const decodedResponse = await res.json()
    if (res.ok) {
        localStorage.setItem('accessToken', decodedResponse.accessToken.split(' ')[1])
        localStorage.setItem('refreshToken', decodedResponse.refreshToken)
        return decodedResponse.user
    }
    throw new Error(decodedResponse.message)
}
export const login = async (user) => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/auth/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
    const decodedResponse = await res.json()
    if (res.ok) {
        localStorage.setItem('accessToken', decodedResponse.accessToken.split(' ')[1])
        localStorage.setItem('refreshToken', decodedResponse.refreshToken)
        return decodedResponse.user
    }
    throw new Error(decodedResponse.message)

}
export const forgotPassword = async (email) => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/password-reset', {
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
export const resetPassword = async (data) => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/password-reset/reset', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({password: data.password, token: data.key})
    })
    const decodedResponse = await res.json()
    if (res.ok) {
        return decodedResponse
    }
    throw new Error(decodedResponse.message)
}
export const checkAuth = async () => {
    const token = localStorage.getItem('accessToken')
    if (token) {
        const res = await fetch(process.env.REACT_APP_API_URL + '/auth/user', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: BEARER_TOKEN_HEADER + token
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
        const decodedResponse = await res.json()
        if (res.ok) {
            return decodedResponse.user
        }
        if (decodedResponse.message === 'jwt expired') {
            await updateToken()
            await checkAuth()
        }
        throw new Error(decodedResponse.message)
    }
    throw new Error()
}
export const LogOut = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    const res = await fetch(process.env.REACT_APP_API_URL + '/auth/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token: refreshToken})
    })
    const decodedResponse = await res.json()
    if (res.ok) {
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        return decodedResponse
    }
    throw new Error(decodedResponse.message)
}
export const updateUser = async (user) => {
    const token = localStorage.getItem('accessToken')
    const res = await fetch(process.env.REACT_APP_API_URL + '/auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: BEARER_TOKEN_HEADER + token
        },
        body: JSON.stringify(user)
    })
    const decodedResponse = await res.json()
    if (res.ok) {
        return decodedResponse
    }
    if (decodedResponse.message === 'jwt expired') {
        await updateToken()
        await updateUser(user)
    } else {
        throw new Error(decodedResponse.message)
    }
}
export const updateToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    if (refreshToken) {
        const res = await fetch(process.env.REACT_APP_API_URL + '/auth/token', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token: refreshToken})
            }
        )
        if (res.ok) {
            const decodedResponse = await res.json()
            if (decodedResponse.success) {
                localStorage.setItem('accessToken', decodedResponse.accessToken.split(' ')[1])
                localStorage.setItem('refreshToken', decodedResponse.refreshToken)
            } else {
                throw new Error(SERVER_ERROR_MESSAGE)
            }
        }
    }
}

