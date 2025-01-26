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

describe("Editor Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Add Block", () => {
    it("should be able to add a new Text block to the editor", () => {
      const dataTransfer = new DataTransfer();
      cy.get(".side-menu li:contains(Text)").trigger("dragstart", {
        dataTransfer,
      });
      cy.get(".canvas-area").trigger("drop", { dataTransfer });
      cy.get(".canvas-area .text-block").should("be.visible");
    });

    it("should be able to add a new Image block to the editor", () => {
      const dataTransfer = new DataTransfer();
      cy.get(".side-menu li:contains(Image)").trigger("dragstart", {
        dataTransfer,
      });
      cy.get(".canvas-area").trigger("drop", { dataTransfer });
      cy.get(".modal-pick-image").should("be.visible");
      cy.get(".modal-pick-image").within(() => {
        cy.root().should("be.visible");
        cy.root().should("contain", "Select an Image to continue");
        cy.get(".image-item").then(($elements) => {
          const randomIndex = Math.floor(Math.random() * $elements.length);
          cy.wrap($elements[randomIndex]).click();
        });
      });
      cy.get(".canvas-area .image-block").should("be.visible");
    });
  });
});
