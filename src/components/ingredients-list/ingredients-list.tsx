import React from 'react';
import IngredientCard from "../ingredient-card/ingredient-card";
import listStyle from './ingredients-list.module.css'
import {IIngredient} from "../../models/i-ingredient.types";

type TIngredientsList = {
    title: string
    ingredients: IIngredient[]
}
const IngredientsList = React.forwardRef<HTMLHeadingElement, TIngredientsList>(
    ({title, ingredients}, ref) => {
        const ingredientCardList = ingredients.map(item => (<IngredientCard key={item._id}
                                                                            ingredient={item}/>))
        return (
            <section className="pb-10" ref={ref}>
                <h3 className="text text_type_main-medium">{title}</h3>
                <ul className={listStyle.wrapper} id="ingredients_list">
                    {ingredientCardList}
                </ul>
            </section>
        );
    })

export default IngredientsList;