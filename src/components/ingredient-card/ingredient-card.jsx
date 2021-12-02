import React, {useContext} from 'react';
import cardStyle from './ingredient-card.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropTypes} from "../../types";
import {IngredientsContext} from "../../services/contexts";

const IngredientCard = ({ingredient}) => {
    const {openIngredientDetailsModal, getCountInCartById} = useContext(IngredientsContext)

    const count = getCountInCartById(ingredient._id, ingredient.type)
    return (
        <li className={cardStyle.wrapper + " mt-6"}
            onClick={() => openIngredientDetailsModal(ingredient)}>
            <div className={cardStyle.image_section}>
                <img src={ingredient.image} alt={ingredient.name}/>
            </div>
            <div className={cardStyle.price_section}>
                <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <h4 className="text text_type_main-default">{ingredient.name}</h4>
            {count > 0 &&
            <div className={cardStyle.count_section}>
                <Counter count={count} size="default"/>
            </div>}
        </li>
    );
};

IngredientCard.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
}

export default IngredientCard;