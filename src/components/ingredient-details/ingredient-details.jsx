import React from 'react';
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../types";

const IngredientDetails = ({closeModal, currentIngredient}) => {
    return (
        <Modal title="Детали ингредиента" closeModal={closeModal}>
            <IngredientInfo currentIngredient = {currentIngredient}/>
        </Modal>
    );
};
IngredientDetails.propTypes = {
    closeModal: PropTypes.func.isRequired,
    currentIngredient: ingredientPropTypes.isRequired
}

export default IngredientDetails;