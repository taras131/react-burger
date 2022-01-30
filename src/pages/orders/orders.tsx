import React, {useEffect} from 'react';
import ordersStyles from './orders.module.css'
const ACCESS_TOKEN = 'accessToken'
const REFRESH_TOKEN = 'refreshToken'

const Orders = () => {
    const accessToken: string | null = localStorage.getItem(ACCESS_TOKEN)
    const refreshToken: string | null = localStorage.getItem(REFRESH_TOKEN)
    useEffect(()=> {
            const ws = new WebSocket(`wss://norma.nomoreparties.space/api/orders`, )
            ws.onmessage = (e => console.log(e))
            ws.onopen = () => console.log('open')
            ws.onclose = () => console.log('close')
            console.log(ws)
        }
    )
    return (
        <div className={ordersStyles.wrapper}>
            Orders
        </div>
    );
};

export default Orders;