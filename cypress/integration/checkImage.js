describe("Checking exhisting new logo on page medium", () => {
  it("existing", () => {
    cy.visit("https://medium.com");
    cy.wait(1000).get(".old-image ").should("exist");
  });
});
