import React, {FC, useEffect} from 'react';
import feedStyles from './feed.module.css';
import FeedOrderItem from "../../components/feed-order-item/feed-order-item";
import {startOrdersListening_new} from "../../services/actions/order-action-creators";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/store";
import {getOrders, getTotal, getTotalToday} from "../../services/selectors/order-selector";
import {IOrder} from "../../models/i-order";


const Feed: FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startOrdersListening_new())
    }, [])
    const orders = useSelector((state: RootState)=> getOrders(state))
    const totalOrders = useSelector((state: RootState)=> getTotal(state))
    const totalTodayOrders = useSelector((state: RootState)=> getTotalToday(state))
    console.log(orders)
    let ordersList = []
    if(orders){
        ordersList = orders.map((item: IOrder) =>  <FeedOrderItem key ={item._id} {...item}/>)
    }

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
                                    <p className="text text_type_digits-default text_color_inactive">43346346</p>
                                    <p className="text text_type_digits-default text_color_inactive">43346346</p>
                                    <p className="text text_type_digits-default text_color_inactive">43346346</p>
                                    <p className="text text_type_digits-default text_color_inactive">43346346</p>
                                    <p className="text text_type_digits-default text_color_inactive">43346346</p>
                                </div>
                            </div>
                            <div className={feedStyles.orders_tab_item}>
                                <p className="text text_type_main-medium">В работе:</p>
                                <div className={feedStyles.orders_number_list}>
                                    <p className="text text_type_digits-default">02352523</p>
                                    <p className="text text_type_digits-default">02352523</p>
                                    <p className="text text_type_digits-default">02352523</p>
                                    <p className="text text_type_digits-default">02352523</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={feedStyles.completed_order}>
                                <h4>Выполнено за всё время:</h4>
                                <p className="text text_type_digits-large">{totalTodayOrders}</p>
                            </div>
                            <div className={feedStyles.completed_order}>
                                <h4>Выполнено за сегодня:</h4>
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