import React, {useEffect} from 'react';
import ordersStyles from './orders.module.css'
import {getOrders} from "../../services/selectors/order-selector";
import FeedOrderItem from "../../components/feed-order-item/feed-order-item";
import {startOrdersListening, stopOrdersListening} from "../../services/actions/order-action-creators";
import {ACCESS_TOKEN, WS_USER_ORDERS} from "../../utils/const";
import {IOrder} from "../../models/i-order.types";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

const Orders = () => {
    const location: any = useLocation()
    const accessToken: string | null = localStorage.getItem(ACCESS_TOKEN)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(startOrdersListening(`${WS_USER_ORDERS}?token=${accessToken}`));
        return () => {
            dispatch(stopOrdersListening())
        }
    }, [dispatch, accessToken])
    const orders = useAppSelector(state => getOrders(state))
    let ordersList
    if (orders) {
        ordersList = orders.map((item: IOrder) => {
            return (
                <Link
                    className={ordersStyles.link}
                    key={item._id}
                    to={`${location.pathname}/${item.number}`}
                    state={{backgroundLocation: location, from: location.pathname}}>
                    <FeedOrderItem {...item}/>
                </Link>
            )
        })
    }
    return (
        <div className={ordersStyles.wrapper}>
            {ordersList}
        </div>
    );
};

export default Orders;