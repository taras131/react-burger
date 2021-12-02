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
        body: JSON.stringify({ingredients: cart} )
    })
    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        throw new Error(SERVER_ERROR_MESSAGE)
    }
}

