import React, {useEffect} from 'react';
import ordersStyles from './orders.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/store";
import {getOrders} from "../../services/selectors/order-selector";
import FeedOrderItem from "../../components/feed-order-item/feed-order-item";
import {startOrdersListening, stopOrdersListening} from "../../services/actions/order-action-creators";
import {ACCESS_TOKEN, WS_USER_ORDERS} from "../../utils/const";
import {IOrder} from "../../models/i-order.types";

const Orders = () => {
    const accessToken: string | null = localStorage.getItem(ACCESS_TOKEN)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startOrdersListening(`${WS_USER_ORDERS}?token=${accessToken}`));
        return () => {
            dispatch(stopOrdersListening())
        }
    }, [dispatch, accessToken])
    const orders = useSelector((state: RootState) => getOrders(state))
    let ordersList
    if (orders) {
        ordersList = orders.map((item: IOrder) => <FeedOrderItem key={item._id} {...item}/>)
    }
    return (
        <div className={ordersStyles.wrapper}>
            {ordersList}
        </div>
    );
};

export default Orders;