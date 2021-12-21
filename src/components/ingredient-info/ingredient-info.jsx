import React from 'react';
import ingredientInfoStyles from "./ingredient-info.module.css";
import {ingredientPropTypes} from "../../types";

const IngredientInfo = ({currentIngredient}) => {
    return (
        <div className={ingredientInfoStyles.container + " mb-15"}>
            <section className={ingredientInfoStyles.img_section + " pl-5 pr-5"}>
                <img src={currentIngredient.image_large} alt={currentIngredient.name}/>
            </section>
            <h2 className="text text_type_main-medium mt-4">
                {currentIngredient.name}
            </h2>
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
IngredientInfo.propTypes = {
    currentIngredient: ingredientPropTypes.isRequired
}

export default IngredientInfo;