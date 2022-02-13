import React, {FC} from 'react';
import cardStyle from './ingredient-card.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {getCountInCartById} from "../../services/selectors/cart-selectors";
import {useDrag} from "react-dnd";
import classNames from "classnames";
import {useLocation, useNavigate} from "react-router-dom";
import {ROUTE_INGREDIENTS} from "../../utils/const";
import {IIngredient} from "../../models/i-ingredient.types";
import {useAppSelector} from "../../hooks/redux";

type TIngredientCard = {
    ingredient: IIngredient
}
const IngredientCard: FC<TIngredientCard> = ({ingredient}) => {
    const location: any = useLocation()
    const navigate = useNavigate()
    const count = useAppSelector(state => getCountInCartById(state, ingredient._id))
    const openDetail = (): void => {
        navigate(ROUTE_INGREDIENTS + '/' + ingredient._id, {
            state: {
                from: location.pathname,
                backgroundLocation: location
            }
        })
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

export default IngredientCard;