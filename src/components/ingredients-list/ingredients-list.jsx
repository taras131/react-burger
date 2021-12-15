import React, {useState} from 'react';
import IngredientCard from "../ingredient-card/ingredient-card";
import listStyle from './ingredients-list.module.css'
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../types";
import IngredientDetails from "../ingredient-details/ingredient-details";

const IngredientsList = React.forwardRef(({title, ingredients}, ref) => {
    const [isShowIngredientDetails, setIsShowIngredientDetails] = useState(false)
    const [currentIngredient, setCurrentIngredient] = useState(null)
    const openIngredientDetails = (ingredient) => {
        setCurrentIngredient(ingredient)
        setIsShowIngredientDetails(true)
    }
    const closeIngredientDetails = () => {
        setIsShowIngredientDetails(false)
        setCurrentIngredient(null)
    }
    const ingredientCardList = ingredients.map(item => (<IngredientCard key={item._id}
                                                                        ingredient={item}
                                                                        openIngredientDetails={openIngredientDetails}/>))
    return (
        <section className="pb-10" ref={ref}>
            <h3 className="text text_type_main-medium">{title}</h3>
            <ul className={listStyle.wrapper}>
                {ingredientCardList}
            </ul>
            {isShowIngredientDetails && (<IngredientDetails closeModal={closeIngredientDetails}
                                                            currentIngredient={currentIngredient}/>)}
        </section>
    );
})

IngredientsList.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
}

export default IngredientsList;