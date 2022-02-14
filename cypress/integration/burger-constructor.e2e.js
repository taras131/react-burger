import {ROUTE_MAIN} from "../../src/utils/const";

describe("burger-constructor", () => {
    it("should be h2 with text Собирите бургер", () => {
        cy.visit(ROUTE_MAIN)
        cy.get("h2")
            .should("have.text", "Собирите бургер")
    })
})