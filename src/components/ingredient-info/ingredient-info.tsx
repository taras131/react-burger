import React, {FC} from 'react';
import ingredientInfoStyles from "./ingredient-info.module.css";
import {IIngredient} from "../../models/i-ingredient.types";

type TIngredientInfo = {
    currentIngredient: IIngredient
}
const IngredientInfo: FC<TIngredientInfo> = ({currentIngredient}) => {
    return (
        <div className={ingredientInfoStyles.container + " mb-15"}>
            <section className={ingredientInfoStyles.img_section + " pl-5 pr-5"}>
                <img src={currentIngredient.image_large} alt={currentIngredient.name}/>
            </section>
            <h4 className="text text_type_main-medium mt-4">
                {currentIngredient.name}
            </h4>
            <ul className={ingredientInfoStyles.details_section + " mt-8"}>
                <li className={ingredientInfoStyles.details_item}>
                    <p className="text text_type_main-default">Калории,ккал</p>
                    <p className="text text_type_digits-default mt-2">{currentIngredient.calories}</p>
                </li>
                <li className={ingredientInfoStyles.details_item}>
                    <p className="text text_type_main-default">Белки, г</p>
                    <p className="text text_type_digits-default mt-2">{currentIngredient.proteins}</p>
                </li>
                <li className={ingredientInfoStyles.details_item}>
                    <p className="text text_type_main-default">Жиры, г</p>
                    <p className="text text_type_digits-default mt-2">{currentIngredient.fat}</p>
                </li>
                <li className={ingredientInfoStyles.details_item}>
                    <p className="text text_type_main-default">Углеводы, г</p>
                    <p className="text text_type_digits-default mt-2">{currentIngredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
};

export default IngredientInfo;