import React from 'react';
import Modal from "../modal/modal";
import detailsStyles from './ingredient-details.module.css'
import {useSelector} from "react-redux";
import {getCurrentIngredient} from "../../services/selectors/ingredients-selectors";
import {useAppDispatch} from "../../hooks/redux";
import {closeIngredientDetailsModal} from "../../services/reducers/ingredients-slice"

const IngredientDetails = () => {
    const dispatch = useAppDispatch()
    const currentIngredient = useSelector(state => getCurrentIngredient(state))
    const closeModal = () => {
        dispatch(closeIngredientDetailsModal())
    }
    return (
        <Modal title="Детали ингредиента" closeModal={closeModal}>
            <div className={detailsStyles.container + " mb-15"}>
                <section className={detailsStyles.img_section + " pl-5 pr-5"}>
                    <img src={currentIngredient.image_large} alt={currentIngredient.name}/>
                </section>
                <h2 className="text text_type_main-medium mt-4">
                    {currentIngredient.name}
                </h2>
                <ul className={detailsStyles.details_section + " mt-8"}>
                    <li className={detailsStyles.details_item}>
                        <p className="text text_type_main-default">Калории,ккал</p>
                        <p className="text text_type_digits-default mt-2">{currentIngredient.calories}</p>
                    </li>
                    <li className={detailsStyles.details_item}>
                        <p className="text text_type_main-default">Белки, г</p>
                        <p className="text text_type_digits-default mt-2">{currentIngredient.proteins}</p>
                    </li>
                    <li className={detailsStyles.details_item}>
                        <p className="text text_type_main-default">Жиры, г</p>
                        <p className="text text_type_digits-default mt-2">{currentIngredient.fat}</p>
                    </li>
                    <li className={detailsStyles.details_item}>
                        <p className="text text_type_main-default">Углеводы, г</p>
                        <p className="text text_type_digits-default mt-2">{currentIngredient.carbohydrates}</p>
                    </li>
                </ul>
            </div>
        </Modal>
    );
};

export default IngredientDetails;