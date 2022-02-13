import {fetchOrderInfo} from "./order-action-creators";

describe.only("Order action creators", () => {
    test("creates the action fetchOrderInfo", () => {
        expect(fetchOrderInfo.fulfilled.type).toEqual("fetch_order_info/fulfilled")
        expect(fetchOrderInfo.pending.type).toEqual("fetch_order_info/pending")
        expect(fetchOrderInfo.rejected.type).toEqual("fetch_order_info/rejected")
    })
    test("exposes the typePrefix it was created with fetchIngredients", () => {
        expect(fetchOrderInfo.typePrefix).toEqual("fetch_order_info")
    })
})