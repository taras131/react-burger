import React, {FC} from 'react';
import detailsStyles from './order-details.module.css'
import Modal from "../modal/modal";
import done from "../../images/done.gif";
import {getOrderNumber} from "../../services/selectors/cart-selectors";
import {closeOrderDetailModal} from '../../services/reducers/cart-slice'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

const OrderDetails: FC = () => {
    const dispatch = useAppDispatch()
    const closeModal = () => {
        dispatch(closeOrderDetailModal())
    }
    const orderNumber = useAppSelector(state => getOrderNumber(state))
    return (
        <Modal closeModal={closeModal}>
            <div className={detailsStyles.wrapper}>
                <section className={detailsStyles.order_number}>
                    <p className="text text_type_digits-large">{orderNumber}</p>
                </section>
                <h3 className="text text_type_main-medium mt-8">
                    Индетификатор заказа
                </h3>
                <div className={detailsStyles.done_section + " mt-15"}>
                    <img src={done} alt="done"/>
                </div>
                <p className="text text_type_main-default mt-15">
                    Ваш заказ начали готовить
                </p>
                <p className="text text_type_main-default mt-2 mb-30" style={{color: '#8585AD'}}>
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </Modal>
    );
};


export default OrderDetails;