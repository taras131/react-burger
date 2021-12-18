import React from 'react';
import cardStyle from './ingredient-card.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropTypes} from "../../types";
import {getCountInCartById} from "../../services/selectors/cart-selectors";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import classNames from "classnames";
import {useLocation, useNavigate} from "react-router-dom";
import {ROUTE_INGREDIENTS} from "../../utils/const";

const IngredientCard = ({ingredient}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const count = useSelector(state => getCountInCartById(state, ingredient._id))
    const openDetail = () => {
        navigate(ROUTE_INGREDIENTS+'/'+ingredient._id,{state: {from: location.pathname}})
    }
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'ingredient',
        item: {...ingredient},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    return (
        <li className={classNames(cardStyle.wrapper, {
            [cardStyle.dragging]: isDragging
        })}
            onClick={openDetail}
            ref={drag}>
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