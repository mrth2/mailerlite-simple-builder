import { dragNewImage, dragNewText } from "../../helpers/editor-utils";

describe("Verify Block Actions", () => {
  beforeEach(() => {
    cy.visit("/");

    dragNewText(); // drag a new Text block to the canvas
    dragNewImage(); // drag a new Image block to canvas
  });

  it("should be able to edit a text block", () => {
    cy.get(".canvas-area .text-block").click();
    cy.get(".canvas-area .text-block").type("Hello World");
    cy.get(".canvas-area .text-block").should("contain", "Hello World");
  });

  it("should be able to move a block up", () => {});

  it("should be able to move a block down", () => {});

  it("should be able to duplicate a block", () => {});

  it("should be able to delete a block", () => {});
});
