describe("Verify UI Elements", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Header Menu", () => {
    it("should display the header", () => {
      cy.get(".header-menu").should("be.visible");
    });

    it("should display the save button", () => {
      cy.get(".header-menu button")
        .contains("Save")
        .should("be.visible")
        .should("not.be.disabled");
    });
  });

  context("Side Menu", () => {
    it("should have a side menu", () => {
      cy.get(".side-menu").should("be.visible");
    });

    it("should have draggable Text block", () => {
      cy.get(".side-menu")
        .contains("Text")
        .should("be.visible")
        .should("have.attr", "draggable", "true");
    });

    it("should have draggable Image block", () => {
      cy.get(".side-menu")
        .contains("Image")
        .should("be.visible")
        .should("have.attr", "draggable", "true");
    });
  });
});
