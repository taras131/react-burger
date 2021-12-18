export const getUniqueKey = () => {
    return new Date().valueOf()
}
export const validationName = (name) => {
    if(name.length < 2) return 'не может быть короче 2 символов'
    if(name.length > 15) return 'не может быть длиннее 15 символов'
    return ''
}
export const validationPassword = (password) => {
    if(password.length < 4) return 'не может быть короче 4 символов'
    if(password.length > 15) return 'не может быть длиннее 15 символов'
    return ''
}
export const validateEmail = (email) => {
    if(String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        return ''
    } else {
        return 'Неккоректный email'
    }
}