import {SERVER_ERROR_MESSAGE} from "../utils/const";

export const getAllIngredients = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/ingredients')
    if (response.ok) {
        const data = await response.json()
        return data.data
    } else {
        throw new Error(SERVER_ERROR_MESSAGE)
    }
}
export const createNewOrder = async (cart) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/orders', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ingredients: cart})
    })
    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        throw new Error(SERVER_ERROR_MESSAGE)
    }
}
export const register = async (user) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/auth/register', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
    if (response.ok) {
        const data = await response.json()
        localStorage.setItem('accessToken', data.accessToken.split(' ')[1])
        localStorage.setItem('refreshToken', data.refreshToken)
        return data.user
    } else {
        throw new Error(SERVER_ERROR_MESSAGE)
    }
}
export const login = async (user) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/auth/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
    if (response.ok) {
        const data = await response.json()
        console.log(data)
        localStorage.setItem('accessToken', data.accessToken.split(' ')[1])
        localStorage.setItem('refreshToken', data.refreshToken)
        return data.user
    } else {
        throw new Error(SERVER_ERROR_MESSAGE)
    }
}
export const forgotPassword = async (email) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/password-reset', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({email: email})
    })
    console.log(response)
    if (response.ok) {
        const data = await response.json()
        console.log(data)
        if (data.success) {
            return data
        } else {
            throw new Error("Пользователя с таким email не существует")
        }
    } else {
        throw new Error(SERVER_ERROR_MESSAGE)
    }
}
export const resetPassword = async (data) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/password-reset/reset', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({password: data.password, token: data.key})
    })
    console.log(response)
    if (response.ok) {
        const res = await response.json()
        return res
    } else {
        throw new Error(SERVER_ERROR_MESSAGE)
    }
}
export const checkAuth = async (token) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/auth/user', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
    if (response.ok) {
        const res = await response.json()
        return res
    } else {
        throw new Error(SERVER_ERROR_MESSAGE)
    }
}
export const LogOut = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await fetch(process.env.REACT_APP_API_URL + '/auth/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token: refreshToken})
    })
    console.log(response)
    if (response.ok) {
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        const res = await response.json()
        console.log(res)
        return res
    } else {
        throw new Error(SERVER_ERROR_MESSAGE)
    }
}

