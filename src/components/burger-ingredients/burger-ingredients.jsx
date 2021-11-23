import React, {useContext, useEffect} from 'react';
import burgerIngredientsStyle from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from "../ingredients-list/ingredients-list";
import {IngredientsContext} from "../../services/contexts";

const categories = ["Булки", "Соусы", "Начинки"]

const BurgerIngredients = () => {
    const {ingredientsData} = useContext(IngredientsContext)
    const [activeCategory, setActiveCategory] = React.useState(categories[0])
    const filterIngredientsByType = (type) => ingredientsData.filter(item => item.type === type)
    const selectBlock = categories.map(item => {
        return (
            <Tab key={item} value={item} active={activeCategory === item} onClick={setActiveCategory}>
                {item}
            </Tab>
        )
    })
    useEffect(() => {
        const scroll = document.getElementById('scrolledBlock');
        switch (activeCategory) {
            case categories[1]:
                scroll.scrollTop = 300;
                break
            case categories[2]:
                scroll.scrollTop = 860;
                break
            default:
                scroll.scrollTop = 0;
        }
    }, [activeCategory])
    return (
        <div className={burgerIngredientsStyle.wrapper}>
            <h2 className="text text_type_main-large mt-10">Собирите бургер</h2>
            <nav style={{display: 'flex', justifyContent: 'center'}} className={burgerIngredientsStyle.menu + " mt-5"}>
                {selectBlock}
            </nav>
            <div id="scrolledBlock" className={burgerIngredientsStyle.ingredients_wrapper + " mt-10 mb-10"}>
                <IngredientsList title={categories[0]}
                                 ingredients={filterIngredientsByType('bun')}/>
                <IngredientsList title={categories[1]}
                                 ingredients={filterIngredientsByType('sauce')}/>
                <IngredientsList title={categories[2]}
                                 ingredients={filterIngredientsByType('main')}/>
            </div>
        </div>
    );
};

export default BurgerIngredients;