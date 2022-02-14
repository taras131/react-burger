describe("Drag and Drop", () => {
    it("Should be bun added to constructor", () => {
        cy.get('section')
            .find("ul")
            .eq(0)
            .find("li")
            .first()
            .trigger("dragstart");
        cy.get('div[id="constructor"]').trigger("drop")
            .find('div[id="bun"]').should('have.length', '1')

    });
    it("Should be sauce added to constructor", () => {
        cy.get('section')
            .find("ul")
            .eq(1)
            .find("li")
            .first()
            .trigger("dragstart");
        cy.get('div[id="constructor"]').trigger("drop")
            .find('ul')
            .find('li').should('have.length', '1')
    });
    it("Should be main added to constructor", () => {
        cy.get('section')
            .find("ul")
            .eq(2)
            .find("li")
            .first()
            .trigger("dragstart");
        cy.get('div[id="constructor"]').trigger("drop")
            .find('ul')
            .find('li').should('have.length', '2')
    });
});