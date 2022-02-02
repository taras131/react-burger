import React, {FC, useEffect} from 'react';
import feedStyles from './feed.module.css';
import FeedOrderItem from "../../components/feed-order-item/feed-order-item";
import {startOrdersListening, stopOrdersListening} from "../../services/actions/order-action-creators";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/store";
import {
    getNumbersOrdersInProcess,
    getNumbersReadyOrders, getOrderError, getOrderIsLoading,
    getOrders,
    getTotal,
    getTotalToday
} from "../../services/selectors/order-selector";
import {WS_ALL_ORDERS} from "../../utils/const";
import {IOrder} from "../../models/i-order.types";
import ErrorMessage from "../../components/error-message/error-message";
import Preloader from "../../components/preloader/preloader";

const Feed: FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startOrdersListening(WS_ALL_ORDERS));
        return () => {
            dispatch(stopOrdersListening())
        }
    }, [dispatch])
    const error = useSelector((state: RootState) => getOrderError(state))
    const isLoading = useSelector((state: RootState) => getOrderIsLoading(state))
    const ordersInProcessNumbers = useSelector((state: RootState) => getNumbersOrdersInProcess(state))
    const inProgress = ordersInProcessNumbers.slice(0, 20).map((item: number, index: number) => {
        return (<p className="text text_type_digits-default text_color_inactive" key={item}>
            {item}
        </p>)
    })
    const ordersReadyNumbers = useSelector((state: RootState) => getNumbersReadyOrders(state))
    const isReady = ordersReadyNumbers.slice(0, 20).map((item: number, index: number) => {
        return (<p className="text text_type_digits-default" key={item}>
            {item}
        </p>)
    })
    const orders = useSelector((state: RootState) => getOrders(state))
    const totalOrders = useSelector((state: RootState) => getTotal(state))
    const totalTodayOrders = useSelector((state: RootState) => getTotalToday(state))
    if (error) return (<ErrorMessage errorMessage={error}/>)
    if (isLoading) return (<Preloader/>)
    const ordersList = orders.map((item: IOrder) => <FeedOrderItem key={item._id} {...item}/>)
    return (
        <div className={feedStyles.wrapper}>
            <div className={feedStyles.content}>
                <p className="text text_type_main-large">Лента Заказов</p>
                <div className={feedStyles.orders_container}>
                    <section className={feedStyles.orders_items}>
                        {orders && ordersList}
                    </section>
                    <section className={feedStyles.orders_info}>
                        <div className={feedStyles.orders_tab}>
                            <div className={feedStyles.orders_tab_item}>
                                <p className="text text_type_main-medium">Готовы:</p>
                                <div className={feedStyles.orders_number_list}>
                                    {isReady && isReady}
                                </div>
                            </div>
                            <div className={feedStyles.orders_tab_item}>
                                <p className="text text_type_main-medium">В работе:</p>
                                <div className={feedStyles.orders_number_list}>
                                    {inProgress && inProgress}
                                </div>
                            </div>
                        </div>
                        <div className="mt-15">
                            <div className={feedStyles.completed_order}>
                                <p className="text text_type_digits-default">Выполнено за всё время:</p>
                                <p className="text text_type_digits-large">{totalTodayOrders}</p>
                            </div>
                            <div className={feedStyles.completed_order}>
                                <p className="text text_type_digits-default">Выполнено за сегодня:</p>
                                <p className="text text_type_digits-large">{totalOrders}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Feed;