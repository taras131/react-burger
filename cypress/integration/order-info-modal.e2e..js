import {ROUTE_LOGIN} from "../../src/utils/const";

describe("Order info modal", () => {
    it("should be open order info modal", () => {
        cy.visit(ROUTE_LOGIN)
        cy.get("input").first().click().type("t@mail.ru");
        cy.get("input").last().click().type("1111");
        cy.get("button").click();
        cy.wait(3000);
        cy.get("section")
            .find("ul")
            .eq(0)
            .find("li")
            .first()
            .trigger("dragstart");
        cy.get('div[id="constructor"]').trigger("drop")
        cy.get("button").click()
        cy.wait(18000);
        cy.get("[class^=modal_content]")
            .find("h3")
            .should("have.text", "Индетификатор заказа")
    })
    it("should be close order info modal", () => {
        cy.get("[class^=modal_content]")
            .find("span")
            .click()
            .should("not.exist");
    })
})