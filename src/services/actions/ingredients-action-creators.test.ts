import {fetchIngredients} from "./ingredients-action-creators";

describe.only("Ingredients action creators", () => {
    test("creates the action fetchIngredients", () => {
        expect(fetchIngredients.fulfilled.type).toEqual("fetch_all_ingredients/fulfilled")
        expect(fetchIngredients.pending.type).toEqual("fetch_all_ingredients/pending")
        expect(fetchIngredients.rejected.type).toEqual("fetch_all_ingredients/rejected")
    })
    test("exposes the typePrefix it was created with fetchIngredients", () => {
        expect(fetchIngredients.typePrefix).toEqual("fetch_all_ingredients")
    })
})