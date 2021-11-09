import React from 'react';
import detailsStyles from './order-details.module.css'
import Modal from "../modal/modal";
import done from "../../images/done.gif";
import PropTypes from "prop-types";
import {orderPropTypes} from "../../types";

const OrderDetails = ({closeModal, order}) => {
    return (
        <Modal closeModal={closeModal}>
            <div className={detailsStyles.wrapper}>
                <section className={detailsStyles.order_number}>
                    <p className="text text_type_digits-large">{order.number}</p>
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

OrderDetails.propTypes = {
    closeModal: PropTypes.func.isRequired,
    order: orderPropTypes.isRequired
}

export default OrderDetails;