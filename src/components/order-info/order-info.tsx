import React, {FC} from 'react';
import orderInfoStyles from './order-info.module.css';
import PriceWithIcon from "../price-with-icon/price-with-icon";
import {getAmountByIngredientsId} from "../../services/selectors/ingredients-selectors";
import IngredientItemInOrderInfo from "../ingredient-item-in-order-info/ingredient-item-in-order-info";
import {convertStatusOrderFromRussian, getDate} from "../../utils/service";
import {IOrder} from "../../models/i-order.types";
import {useAppSelector} from "../../hooks/redux";

interface IOrderInfo {
    order: IOrder
}

const OrderInfo: FC<IOrderInfo> = ({order}) => {
    const amount = useAppSelector(state => getAmountByIngredientsId(state, order.ingredients))
    let ingredients = new Set(order.ingredients)
    const ingredientsList = Array.from(ingredients).map(item => <IngredientItemInOrderInfo key={item}
                                                                                           ingredientId={item}
                                                                                           orderId={order._id}/>)
    return (
        <div className={orderInfoStyles.wrapper}>
            <div className={orderInfoStyles.content}>
                <div className={orderInfoStyles.number}>
                    <p className="text text_type_digits-default">#{order.number}</p>
                </div>
                <div className={orderInfoStyles.name}>
                    <p className="text text_type_main-medium">{order.name}</p>
                </div>
                <div className={orderInfoStyles.status}>
                    <p className="text text_type_digits-small text_color_inactive">
                        {convertStatusOrderFromRussian(order.status)}
                    </p>
                </div>
                <p className="text text_type_main-medium mt-15">Состав:</p>
                <div className={orderInfoStyles.ingredients}>
                    {ingredientsList}
                </div>
                <div className={orderInfoStyles.footer}>
                    <p className="text text_type_main-small text_color_inactive">{getDate(order.createdAt)}</p>
                    <PriceWithIcon price={amount}/>
                </div>
            </div>
        </div>
    );
};

export default OrderInfo;