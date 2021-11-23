import React from 'react';
import mainStyle from './main.module.css'
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

const Main = () => {
    return (
        <main className={mainStyle.wrapper}>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </main>
    );
};

export default Main;