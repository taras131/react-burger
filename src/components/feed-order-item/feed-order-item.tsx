import React, {FC} from 'react';
import feedOrderItemStyles from './feed-order-item.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IOrder} from "../../models/i-order";
import {useSelector} from "react-redux";
import {RootState} from "../../services/store";
import {getAmountByIds, getMobileImagesById, getPriceById} from "../../services/selectors/ingredients-selectors";

const FeedOrderItem: FC<IOrder> = ({ingredients, status, number, createdAt, name}) => {
    const amount = useSelector((state: RootState) => getAmountByIds(state, ingredients))
    const images = useSelector((state: RootState) => getMobileImagesById(state, ingredients))
    const ingredientCount = images.length
    const imagesList = images.map((item, index) => {
        if (index < 5) {
            return (
                <div key={index} className={feedOrderItemStyles.image_container}>
                    <img src={item} alt='ingredients image'/>
                </div>
            )
        }
        if (index === 5) {
            return (
                <div key={index} className={feedOrderItemStyles.image_container
                + ' ' + feedOrderItemStyles.last}>
                    <img src={item} alt='ingredients image'/>
                    <p className="text text_type_digits-default">+{ingredientCount - 5}</p>
                </div>
            )
        }
    })
    return (
        <div className={feedOrderItemStyles.wrapper}>
            <section className={feedOrderItemStyles.order_header}>
                <p className="text text_type_digits-default">#{number}</p>
                <p className="text text_type_main-small text_color_inactive">{createdAt}</p>
            </section>
            <section className={feedOrderItemStyles.order_name}>
                <p className="text text_type_main-medium">{name}</p>
            </section>
            <section className={feedOrderItemStyles.order_description}>
                <div className={feedOrderItemStyles.ingredients_images}>
                    {imagesList}
                </div>
                <div className={feedOrderItemStyles.order_amount}>
                    <p className="text text_type_digits-default">{amount}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </section>
        </div>
    );
};

export default FeedOrderItem;