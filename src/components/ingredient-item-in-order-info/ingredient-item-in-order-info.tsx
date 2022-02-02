import React, {FC} from 'react';
import ingredientItemInOrderInfoStyles from './ingredient-item-in-order-info.module.css';
import {useSelector} from "react-redux";
import {getIngredientById} from "../../services/selectors/ingredients-selectors";
import {RootState} from "../../services/store";
import {getCountIngredientsInOrder} from "../../services/selectors/order-selector";
import ImageCircleIngredient from "../common/image-circle-ingredient/image-circle-ingredient";
import PriceWithIcon from "../common/price-with-icon/price-with-icon";

interface IIngredientItemInOrderInfo {
    ingredientId: string | undefined,
    orderId: string | undefined
}

const IngredientItemInOrderInfo: FC<IIngredientItemInOrderInfo> = ({ingredientId, orderId}) => {
    const ingredient = useSelector((state: RootState) => getIngredientById(state, ingredientId))
    const countInOrder = useSelector((state: RootState) => getCountIngredientsInOrder(state, ingredientId, orderId))
    return (
        <div className={ingredientItemInOrderInfoStyles.wrapper}>
            <ImageCircleIngredient image={ingredient.image_mobile}/>
            <div>
                <p className="text text_type_main-default ml-1">{ingredient.name}</p>
            </div>
            <div className={ingredientItemInOrderInfoStyles.price}>
                <p className="text text_type_digits-default mr-2">{countInOrder} x</p>
                <PriceWithIcon price={ingredient.price}/>
            </div>
        </div>
    );
};

export default IngredientItemInOrderInfo;