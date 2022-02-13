import {fetchCreateOrder} from "./cart-action-creators";


describe.only("Cart action creators", () => {
    test("creates the action fetchCreateOrder", () => {
        expect(fetchCreateOrder.fulfilled.type).toEqual("fetch_create_order/fulfilled")
        expect(fetchCreateOrder.pending.type).toEqual("fetch_create_order/pending")
        expect(fetchCreateOrder.rejected.type).toEqual("fetch_create_order/rejected")
    })
    test("exposes the typePrefix it was created with fetchCreateOrder", () => {
        expect(fetchCreateOrder.typePrefix).toEqual("fetch_create_order")
    })
})