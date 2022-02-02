import {orderActions} from "../reducers/order-slice";
import {CONNECT_ERROR_MESSAGE, START_ORDERS_LISTENING, STOP_ORDERS_LISTENING} from "../../utils/const";
import {AnyAction, Dispatch, MiddlewareAPI} from "redux";

export const ordersMiddleware = (store: MiddlewareAPI) => {
    let ws: WebSocket | null = null
    const {dispatch} = store
    const onOpen = () => {
        dispatch(orderActions.startConnecting)
    };
    const onClose = () => {
        dispatch(orderActions.stopConnecting)
    };
    const onMessage = (event: MessageEvent) => {
        dispatch(orderActions.setOrders(JSON.parse(event.data)))
    }
    const onError = () => {
        dispatch(orderActions.setError(CONNECT_ERROR_MESSAGE))
    }
    return (next: Dispatch) => (action: AnyAction) => {
        switch (action.type) {
            case START_ORDERS_LISTENING:
                if (ws) ws.close();
                ws = new WebSocket(action.payload);
                ws.onopen = onOpen
                ws.onmessage = (e: MessageEvent) => onMessage(e)
                ws.onclose = onClose
                ws.onerror = () => onError()
                break
            case STOP_ORDERS_LISTENING:
                if (ws) ws.close();
                ws = null
                break
        }
        next(action)
    }
}