import React, {FC} from 'react';
import feedOrderItemStyles from './feed-order-item.module.css';
import {useSelector} from "react-redux";
import {RootState} from "../../services/store";
import {getAmountByIngredientsId, getMobileImagesById} from "../../services/selectors/ingredients-selectors";
import {useLocation, useNavigate} from "react-router-dom";
import PriceWithIcon from "../price-with-icon/price-with-icon";
import ImageCircleIngredient from "../image-circle-ingredient/image-circle-ingredient";
import {convertStatusOrderFromRussian, getDate} from "../../utils/service";
import {ROUTE_FEED} from "../../utils/const";
import {IOrder} from "../../models/i-order.types";

const FeedOrderItem: FC<IOrder> = ({
                                       _id, ingredients, status, number,
                                       createdAt, name
                                   }) => {
    const location: any = useLocation()
    const navigate = useNavigate()
    const amount = useSelector((state: RootState) => getAmountByIngredientsId(state, ingredients))
    const images = useSelector((state: RootState) => getMobileImagesById(state, ingredients))
    const ingredientCount = images.length
    const imagesList = images.slice(0, 6).map((item, index) => {
        if (index < 5) return (<ImageCircleIngredient key={index} image={item} index={index}/>)
        return (<ImageCircleIngredient key={index}
                                       image={item}
                                       ingredientCount={ingredientCount}
                                       index={index}/>)
    })
    const openDetail = (): void => {
        //  Сделал по номеру заказа , не по id потому что сейчас эндпоинт на сервере для запроса конкретного
        // заказа корректно отдаёт только по номеру
        navigate(location.pathname + '/' + number, {state: {from: location.pathname}})
    }
    return (
        <div className={feedOrderItemStyles.wrapper} onClick={openDetail}>
            <section className={feedOrderItemStyles.order_header}>
                <p className="text text_type_digits-default">#{number}</p>
                <p className="text text_type_main-small text_color_inactive">{getDate(createdAt)}</p>
            </section>
            <section className={feedOrderItemStyles.order_name}>
                <p className="text text_type_main-medium">{name}</p>
                {location.pathname !== ROUTE_FEED && (
                    <p className="text text_type_main-small text_color_inactive">
                        {convertStatusOrderFromRussian(status)}
                    </p>
                )}
            </section>
            <section className={feedOrderItemStyles.order_description}>
                <div className={feedOrderItemStyles.ingredients_images}>
                    {imagesList}
                </div>
                <PriceWithIcon price={amount}/>
            </section>
        </div>
    );
};

export default FeedOrderItem;