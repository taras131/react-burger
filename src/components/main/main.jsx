import React from 'react';
import mainStyle from './main.module.css'
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../types";

const Main = ({ingredientsData}) => {
    return (
        <main className={mainStyle.wrapper}>
            <BurgerIngredients ingredientsData = {ingredientsData}/>
            <BurgerConstructor ingredientsData = {ingredientsData}/>
        </main>
    );
};

Main.PropsType={
    ingredientsData: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}

export default Main;