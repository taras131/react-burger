import React, {useState} from 'react';
import ingredientsStyles from './ingredients.module.css'
import {useLocation, useParams, useNavigate} from "react-router-dom";
import IngredientInfo from "../../components/ingredient-info/ingredient-info";
import {useSelector} from "react-redux";
import {getIngredientById} from "../../services/selectors/ingredients-selectors";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {ROUTE_MAIN} from "../../utils/const";

const Ingredients = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const id = useParams().id
    const [isShowIngredientDetails, setIsShowIngredientDetails] = useState(true)
    const currentIngredient = useSelector(state =>getIngredientById(state, id))
    const closeIngredientDetails = () => {
        setIsShowIngredientDetails(false)
        navigate(ROUTE_MAIN)
    }
   if(location.state && location.state.from === ROUTE_MAIN){
       return (
           <>
               {isShowIngredientDetails && (<IngredientDetails closeModal={closeIngredientDetails}
                                                               currentIngredient={currentIngredient}/>)}
           </>
       )
   }
    return (
        <div className={ingredientsStyles.wrapper}>
        <IngredientInfo currentIngredient={currentIngredient}/>
        </div>
    );
};

export default Ingredients;