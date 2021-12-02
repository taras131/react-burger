import React, {useRef, useState} from 'react';
import burgerIngredientsStyle from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from "../ingredients-list/ingredients-list";
import {useSelector} from "react-redux";
import {getIngredientsByType} from "../../services/selectors/ingredients-selectors";

const categories = [{id: 0, type: 'bun', name: 'Булки'}, {id: 1, type: 'sauce', name: 'Соусы'},
    {id: 2, type: 'main', name: 'Начинки'}]

const BurgerIngredients = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0].type)
    const refBun = useRef(null)
    const refSauce = useRef(null)
    const refMain = useRef(null)
    const buns = useSelector(state => getIngredientsByType(state, categories[0].type))
    const sauces = useSelector(state => getIngredientsByType(state, categories[1].type))
    const mains = useSelector(state => getIngredientsByType(state, categories[2].type))
    const onScroll = (e) => {
        const bunTop = refBun.current.getBoundingClientRect().top - 323
        const sauceTop = refSauce.current.getBoundingClientRect().top - 323
        const mainTop = refMain.current.getBoundingClientRect().top - 323
        let currentPosition
        if (Math.abs(bunTop) < Math.abs(sauceTop) && Math.abs(bunTop) < Math.abs(mainTop)) {
            currentPosition = categories[0].type
        }
        if (Math.abs(sauceTop) < Math.abs(bunTop) && Math.abs(sauceTop) < Math.abs(mainTop)) {
            currentPosition = categories[1].type
        }
        if (Math.abs(mainTop) < Math.abs(sauceTop) && Math.abs(mainTop) < Math.abs(bunTop)) {
            currentPosition = categories[2].type
        }
        setActiveCategory(currentPosition)
    }
    const onTabClick = (value) => {
        setActiveCategory(value)
        switch (value) {
            case categories[0].type: {
                if (refBun.current) refBun.current.scrollIntoView({behavior: "smooth"});
                break
            }
            case categories[1].type: {
                if (refSauce.current) refSauce.current.scrollIntoView({behavior: "smooth"});
                break
            }
            case categories[2].type: {
                if (refMain.current) refMain.current.scrollIntoView({behavior: "smooth"});
                break
            }
            default:
                if (refBun.current) refBun.current.scrollIntoView({behavior: "smooth"});
        }
    }
    const selectBlock = categories.map(item => {
        return (
            <Tab key={item.id} value={item.type} active={activeCategory === item.type} onClick={onTabClick}>
                {item.name}
            </Tab>
        )
    })
    return (
        <div className={burgerIngredientsStyle.wrapper}
        >
            <h2 className="text text_type_main-large mt-10">Собирите бургер</h2>
            <nav style={{display: 'flex', justifyContent: 'center'}} className={burgerIngredientsStyle.menu + " mt-5"}>
                {selectBlock}
            </nav>
            <div id="scrolledBlock" className={burgerIngredientsStyle.ingredients_wrapper + " mt-10 mb-10"}
                 onScroll={(e) => onScroll(e)}>
                <IngredientsList ref={refBun} title={categories[0].name} ingredients={buns}/>
                <IngredientsList ref={refSauce} title={categories[1].name} ingredients={sauces}/>
                <IngredientsList ref={refMain} title={categories[2].name} ingredients={mains}/>
            </div>
        </div>
    );
};

export default BurgerIngredients;