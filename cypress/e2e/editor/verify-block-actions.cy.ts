import { dragNewImage, dragNewText } from "../../helpers/editor-utils";

describe("Verify Block Actions", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");

    dragNewText(); // drag a new Text block to the canvas
    dragNewImage(); // drag a new Image block to canvas
  });

  it("should be able to edit a text block", () => {
    cy.get(".canvas-area .text-block").click();
    cy.get(".canvas-area .text-block").type("Hello World");
    cy.get(".canvas-area .text-block").should("contain", "Hello World");
  });

  it("should be able to move a block up", () => {
    // press the up arrow key
    const IMAGE_BLOCK = "@imageBlock";
    cy.get(".canvas-area .image-block")
      .parents(".canvas-block")
      .as(IMAGE_BLOCK.slice(1));
    cy.get(IMAGE_BLOCK).trigger("mouseover"); // hover to view the block actions
    // extract the index of the block
    cy.get(IMAGE_BLOCK)
      .invoke("index")
      .then((index) => {
        cy.get('.block-action-item[data-aria-label="Move Up"]').click();
        // check if the block has moved up
        cy.get(IMAGE_BLOCK)
          .invoke("index")
          .should("eq", index - 1);
      });
  });

  it("should be able to move a block down", () => {
    // press the down arrow key
    const TEXT_BLOCK = "@textBlock";
    cy.get(".canvas-area .text-block")
      .parents(".canvas-block")
      .as(TEXT_BLOCK.slice(1));
    cy.get(TEXT_BLOCK).trigger("mouseover"); // hover to view the block actions
    // extract the index of the block
    cy.get(TEXT_BLOCK)
      .invoke("index")
      .then((index) => {
        cy.get('.block-action-item[data-aria-label="Move Down"]').click();
        // check if the block has moved down
        cy.get(TEXT_BLOCK)
          .invoke("index")
          .should("eq", index + 1);
      });
  });

  it("should be able to duplicate a block", () => {
    // press duplicate button
    const TEXT_BLOCK = "@textBlock";
    cy.get(".canvas-area .text-block")
      .parents(".canvas-block")
      .as(TEXT_BLOCK.slice(1));
    cy.get(TEXT_BLOCK).trigger("mouseover"); // hover to view the block actions
    cy.get(".canvas-block")
      .its("length")
      .then((length) => {
        cy.get('.block-action-item[data-aria-label="Duplicate"]').click();
        // check if the block has been duplicated
        cy.get(".canvas-block")
          .its("length")
          .should("eq", length + 1);
      });
  });

  it("should be able to delete a block", () => {
    // press delete button
    const TEXT_BLOCK = "@textBlock";
    cy.get(".canvas-area .text-block")
      .parents(".canvas-block")
      .as(TEXT_BLOCK.slice(1));
    cy.get(TEXT_BLOCK).trigger("mouseover"); // hover to view the block actions
    cy.get(".canvas-block")
      .its("length")
      .then((length) => {
        cy.get('.block-action-item[data-aria-label="Remove"]').click();
        // check if the block has been deleted
        cy.get(".canvas-block")
          .its("length")
          .should("eq", length - 1);
      });
  });
});
