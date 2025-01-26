describe("Verify Add Blocks", () => {
  beforeEach(() => {
    cy.visit("/");
  });

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
