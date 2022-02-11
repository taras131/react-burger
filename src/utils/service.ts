export const getUniqueKey = () => {
    return new Date().valueOf()
}
export const validationName = (name: string): string => {
    if (name.length < 2) return 'не может быть короче 2 символов'
    if (name.length > 15) return 'не может быть длиннее 15 символов'
    return ''
}
export const validationPassword = (password: string): string => {
    if (password.length < 4) return 'не может быть короче 4 символов'
    if (password.length > 15) return 'не может быть длиннее 15 символов'
    return ''
}
export const validateEmail = (email: string): string => {
    if (String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        return ''
    } else {
        return 'Неккоректный email'
    }
}
const lastDigitToWord = (digit: number): string => {
    const lastFigure = digit % 10;
    if ((digit >= 11 && digit < 15) || lastFigure === 0 || lastFigure >= 5) return 'дней';
    if (lastFigure > 1 && lastFigure < 5) return 'дня';
    return 'день';

}
export const getDate = (orderCreateData: string): string => {
    const orderCreateTime = orderCreateData.slice(11, 16)
    const currentDate = new Date()
    const createDate = new Date(orderCreateData);
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = currentDate.getTime() - createDate.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
    let whatDay
    if (diffInDays === 0) whatDay = 'Сегодня'
    if (diffInDays === 1) whatDay = 'Вчера'
    if (diffInDays > 1) whatDay = `${diffInDays} ${lastDigitToWord(diffInDays)} назад`
    return whatDay + ' ' + orderCreateTime + ' i-GMT+3';
}
export const convertStatusOrderFromRussian = (status: string): string => {
    if (status === 'done') {
        return 'Выполнен'
    } else {
        return 'В работе'
    }
}