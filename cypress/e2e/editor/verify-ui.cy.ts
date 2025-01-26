describe("Verify UI Elements", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
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

  context("Mobile/Tablet Side Menu", () => {
    it("should have side menu on the bottom when viewing from mobile/tablet", () => {
      cy.viewport(800, 600);
      cy.get(".side-menu").should("have.css", "bottom", "0px"); // should be put on bottom
    });
  });
});
