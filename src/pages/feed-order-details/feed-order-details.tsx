import React, {FC, useEffect} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import feedOrderDetailsStyles from './feed-order-details.module.css'
import OrderInfo from "../../components/order-info/order-info";
import Modal from "../../components/modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/store";
import {getOrderByNumber, getOrderIsLoading} from "../../services/selectors/order-selector";
import {fetchOrderInfo} from "../../services/actions/order-action-creators";
import {orderActions} from "../../services/reducers/order-slice";

const FeedOrderDetails: FC = () => {
    const dispatch = useDispatch()
    const location: any = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    let orderNumber: number
    if (params.id) orderNumber = +params.id
    const isLoading = useSelector((state: RootState) => getOrderIsLoading(state))
    let order = useSelector((state: RootState) => getOrderByNumber(state, orderNumber))
    useEffect(() => {
        if (params && params.id) dispatch(fetchOrderInfo(+params.id))
        return () => {
            dispatch(orderActions.cleanOrders)
        }
    }, [dispatch, params])
    const closeOrderDetails = () => {
        navigate(location.state.from)
    }
    if (isLoading || !order) return (<div></div>)
    if (location.state && location.state.from) {
        return (
            <Modal closeModal={closeOrderDetails}>
                <OrderInfo order={order}/>
            </Modal>
        )
    }
    return (
        <div className={feedOrderDetailsStyles.wrapper}>
            <OrderInfo order={order}/>
        </div>
    );
};

export default FeedOrderDetails;