import React from 'react';
import IngredientCard from "../ingredient-card/ingredient-card";
import listStyle from './ingredients-list.module.css'
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../types";

const IngredientsList = ({title, ingredients, openIngredientDetailsModal}) => {
    const ingredientCardList = ingredients.map(item => <IngredientCard key={item._id}
                                                                       ingredient={item}
                                                                       openIngredientDetailsModal={openIngredientDetailsModal}/>)
    return (
        <section className="pb-10">
            <h3 className="text text_type_main-medium">{title}</h3>
            <ul className={listStyle.wrapper}>
                {ingredientCardList}
            </ul>
        </section>
    );
}

IngredientsList.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    openIngredientDetailsModal: PropTypes.func.isRequired
}

export default IngredientsList;