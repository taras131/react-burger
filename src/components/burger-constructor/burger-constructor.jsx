import React from 'react';
import constructorStyle from './burger-constructor.module.css'
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../types";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = ({ingredientsData}) => {
    const orderItems = ingredientsData.map(item => {
        return (
            <li className={constructorStyle.order_item + " pr-2"}>
                <DragIcon type="primary"/>
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image_mobile}
                />
            </li>
        )
    })
    return (
        <section className={constructorStyle.wrapper}>
            <div className={constructorStyle.order_wrapper + " mt-25"}>
                <div className={constructorStyle.order_item + " pr-4"}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={ingredientsData[0].name}
                        price={ingredientsData[0].price}
                        thumbnail={ingredientsData[0].image_mobile}
                    />
                </div>
                <ul className={constructorStyle.order_items}>
                    {orderItems}
                </ul>
                <div className={constructorStyle.order_item + " pr-4"}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={ingredientsData[0].name}
                        price={ingredientsData[0].price}
                        thumbnail={ingredientsData[0].image_mobile}
                    />
                </div>
                <div className={constructorStyle.create_order_section + " pr-4 mt-10"}>
                    <p className="text text_type_digits-default mr-2">91234</p>
                    <div className={constructorStyle.icon_section + " mr-4"}>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    );
};

BurgerConstructor.PropsType = {
    ingredientsData: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}

export default BurgerConstructor;