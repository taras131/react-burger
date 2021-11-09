export const getAllIngredients = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL)
    if (response.ok) {
        const data = await response.json()
        return data.data
    } else {
        return "error"
    }
}

