import { dragNewImage, dragNewText } from "../../helpers/editor-utils";

describe("Verify Add Blocks", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be able to add a new Text block to the editor", () => {
    dragNewText();
  });

  it("should be able to add a new Image block to the editor", () => {
    dragNewImage();
  });
});
