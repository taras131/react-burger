import reducer, {initialState} from "./ingredients-slice";
import {AnyAction} from "@reduxjs/toolkit";
import {IIngredient} from "../../models/i-ingredient.types";

const ingredients: IIngredient[] = [
    {
        _id: "60d3b41abdacab0026a733c9",
        name: "Мясо бессмертных моллюсков Protostomia",
        type: "main",
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: "https://code.s3.yandex.net/react/code/meat-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
        __v: 1
    },
    {
        _id: "60d3b41abdacab0026a733cd",
        name: "Соус фирменный Space Sauce",
        type: "sauce",
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        __v: 0,

    },
    {
        _id: "60d3b41abdacab0026a733cd",
        name: "Соус фирменный Space Sauce",
        type: "sauce",
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        __v: 0,

    }
]
describe.only("Redux cart slice", () => {
    test("Should be return the initial state", () => {
        expect(reducer(undefined, {} as AnyAction)).toEqual(initialState)
    })
    test("Should be ingredients length is 3 fetchIngredients fulfilled", () => {
        const newState = reducer(initialState, {type: "fetch_all_ingredients/fulfilled",payload: ingredients})
        expect(newState.ingredients.length).toEqual(3);
    })
    test("Should be true in isLoading fetchIngredients pending", () => {
        const newState = reducer(initialState, {type: "fetch_all_ingredients/pending"})
        expect(newState.isLoading).toEqual(true);
    })
    test("Should be text in errorMessage fetchIngredients rejected", () => {
        const newState = reducer(initialState, {type: "fetch_all_ingredients/rejected",payload: "error"})
        expect(newState.errorMessage).toEqual("error");
    })
})