import React from 'react';
import mainStyle from './main.module.css'
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../types";

const Main = ({ingredientsData, openOrderDetailsModal, openIngredientDetailsModal}) => {
    return (
        <main className={mainStyle.wrapper}>
            <BurgerIngredients ingredientsData={ingredientsData}
                               openIngredientDetailsModal={openIngredientDetailsModal}/>
            <BurgerConstructor ingredientsData={ingredientsData}
                               openOrderDetailsModal={openOrderDetailsModal}
                               openIngredientDetailsModal={openIngredientDetailsModal}/>
        </main>
    );
};

Main.PropsType = {
    ingredientsData: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    openOrderDetailsModal: PropTypes.func.isRequired,
    openIngredientDetailsModal: PropTypes.func.isRequired
}

export default Main;