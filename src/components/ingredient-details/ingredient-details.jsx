import React from 'react';
import Modal from "../modal/modal";
import detailsStyles from './ingredient-details.module.css'
import {ingredientPropTypes} from "../../types";
import PropTypes from "prop-types";

const IngredientDetails = ({closeModal, ingredient}) => {
    return (
        <Modal title="Детали ингредиента" closeModal={closeModal}>
            <div className={detailsStyles.container + " mb-15"}>
                <section className={detailsStyles.img_section + " pl-5 pr-5"}>
                    <img src={ingredient.image_large} alt={ingredient.name}/>
                </section>
                <h2 className="text text_type_main-medium mt-4">
                    {ingredient.name}
                </h2>
                <ul className={detailsStyles.details_section + " mt-8"}>
                    <li className={detailsStyles.details_item}>
                        <p className="text text_type_main-default">Калории,ккал</p>
                        <p className="text text_type_digits-default mt-2">{ingredient.calories}</p>
                    </li>
                    <li className={detailsStyles.details_item}>
                        <p className="text text_type_main-default">Белки, г</p>
                        <p className="text text_type_digits-default mt-2">{ingredient.proteins}</p>
                    </li>
                    <li className={detailsStyles.details_item}>
                        <p className="text text_type_main-default">Жиры, г</p>
                        <p className="text text_type_digits-default mt-2">{ingredient.fat}</p>
                    </li>
                    <li className={detailsStyles.details_item}>
                        <p className="text text_type_main-default">Углеводы, г</p>
                        <p className="text text_type_digits-default mt-2">{ingredient.carbohydrates}</p>
                    </li>
                </ul>
            </div>
        </Modal>
    );
};
IngredientDetails.propTypes = {
    closeModal: PropTypes.func.isRequired,
    ingredient: ingredientPropTypes.isRequired
}

export default IngredientDetails;