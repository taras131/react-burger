import React from 'react';
import cardStyle from './ingredient-card.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropTypes} from "../../../types";
import PropTypes from "prop-types";

const IngredientCard = ({ingredient, openIngredientDetailsModal}) => {
    const count = 2
    return (
        <li className={cardStyle.wrapper + " mt-6"}
            onClick={() => openIngredientDetailsModal(ingredient)}>
            <div className={cardStyle.image_section}>
                <img src={ingredient.image} alt=""/>
            </div>
            <div className={cardStyle.price_section}>
                <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
            {count > 0 &&
            <div className={cardStyle.count_section}>
                <Counter count={count} size="default"/>
            </div>}
        </li>
    );
};

IngredientCard.PropsType = {
    ingredient: ingredientPropTypes.isRequired,
    openIngredientDetailsModal: PropTypes.func.isRequired
}

export default IngredientCard;