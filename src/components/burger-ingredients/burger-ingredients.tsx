import React, {FC, useCallback, useRef, useState} from 'react';
import burgerIngredientsStyle from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from "../ingredients-list/ingredients-list";
import {getIngredientsByType} from "../../services/selectors/ingredients-selectors";
import {useAppSelector} from "../../hooks/redux";

interface INameIngredient {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки'
}

const nameIngredient: INameIngredient = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки'
}

interface ITypeIngredient {
    bun: 'bun',
    sauce: 'sauce',
    main: 'main'
}

const typeIngredient: ITypeIngredient = {
    bun: 'bun',
    sauce: 'sauce',
    main: 'main'
}

type TCategories = {
    id: number
    type: string
    name: string
}
const categories: Array<TCategories> = [{id: 0, type: typeIngredient.bun, name: nameIngredient.bun},
    {id: 1, type: typeIngredient.sauce, name: nameIngredient.sauce},
    {id: 2, type: typeIngredient.main, name: nameIngredient.main}]

const BurgerIngredients: FC = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0].type)
    const refBun = useRef<HTMLHeadingElement>(null)
    const refSauce = useRef<HTMLHeadingElement>(null)
    const refMain = useRef<HTMLHeadingElement>(null)
    const buns = useAppSelector(state => getIngredientsByType(state, categories[0].type))
    const sauces = useAppSelector(state => getIngredientsByType(state, categories[1].type))
    const mains = useAppSelector(state => getIngredientsByType(state, categories[2].type))
    const onScroll = (e: React.UIEvent<HTMLElement>): void => {
        if (refBun.current && refSauce.current && refMain.current) {
            const bunBorderTopY: number = Math.abs(refBun.current.getBoundingClientRect().top - 323)
            const sauceBorderTopY: number = Math.abs(refSauce.current.getBoundingClientRect().top - 323)
            const mainBorderTopY: number = Math.abs(refMain.current.getBoundingClientRect().top - 323)
            let currentCategory: string = ''
            if (bunBorderTopY < sauceBorderTopY && bunBorderTopY < mainBorderTopY) {
                currentCategory = categories[0].type
            }
            if (sauceBorderTopY < bunBorderTopY && sauceBorderTopY < mainBorderTopY) {
                currentCategory = categories[1].type
            }
            if (mainBorderTopY < sauceBorderTopY && mainBorderTopY < bunBorderTopY) {
                currentCategory = categories[2].type
            }
            setActiveCategory(currentCategory)
        }
    }
    const onTabClick = useCallback((value: string) => {
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

    }, [refBun, refSauce, refMain])
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
                 onScroll={onScroll}>
                <IngredientsList ref={refBun} title={categories[0].name} ingredients={buns}/>
                <IngredientsList ref={refSauce} title={categories[1].name} ingredients={sauces}/>
                <IngredientsList ref={refMain} title={categories[2].name} ingredients={mains}/>
            </div>
        </div>
    );
};

export default BurgerIngredients;