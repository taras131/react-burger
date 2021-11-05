import React from 'react';
import './App.module.css';
import AppHeader from "../app-header/app-header";
import appStyles from "./App.module.css"
import Main from "../main/main";
import {data} from "../../utils/data";

const App = () => {
    const ingredientsData = JSON.parse(data)
    return (
        <div className={appStyles.wrapper}>
            <AppHeader/>
            <Main ingredientsData = {ingredientsData}/>
        </div>
    );
}

export default App;
