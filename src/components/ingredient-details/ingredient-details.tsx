import React, {FC} from 'react';
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import {IIngredient} from "../../models/i-ingredient.types";

type TIngredientDetails = {
    closeModal: ()=> void,
    currentIngredient: IIngredient
}
const IngredientDetails: FC<TIngredientDetails> = ({closeModal, currentIngredient}) => {
    return (
        <Modal title="Детали ингредиента" closeModal={closeModal}>
            <IngredientInfo currentIngredient={currentIngredient}/>
        </Modal>
    );
};

export default IngredientDetails;