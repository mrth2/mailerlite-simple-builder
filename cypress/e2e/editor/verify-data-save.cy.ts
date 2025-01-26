import { dragNewImage, dragNewText } from "../../helpers/editor-utils";

describe("Verify Data Save", () => {
  let spyErrorLog: any;
  beforeEach(() => {
    Cypress.on("window:before:load", (win) => {
      spyErrorLog = cy.spy(win.console, "log"); // can be: log, warn
    });

    cy.viewport(1920, 1080);
    cy.visit("/");

    dragNewText(); // drag a new Text block to the canvas
    dragNewImage(); // drag a new Image block to canvas
    dragNewText(); // drag 2nd Text block to the canvas
  });

  it("should be able to save data to console logs", () => {
    cy.get('.header-menu button:contains("Save")').click();
  });
  
  after(() => {
    expect(spyErrorLog).to.be.calledWith("Saved data:");
  })
});
