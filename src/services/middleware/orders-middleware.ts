import {setOrders} from "../reducers/order-slice";
import {data} from "../../data";

export const ordersMiddleware = (store: any) => (next: any) => (action: any) => {
    if(action.type === 'MIDDLEWARE'){
        const { dispatch } = store;
        const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all')
        ws.onmessage = (e: any) => {
            const decodedRes = JSON.parse(e.data)
            if(decodedRes.success){
                dispatch(setOrders(decodedRes))
            }
        }
        ws.onopen = ()=> {
            console.log('open')


        }
        ws.onclose = ()=>console.log('onclose')
        console.log(ws)
    } else {
        next(action)
    }
}