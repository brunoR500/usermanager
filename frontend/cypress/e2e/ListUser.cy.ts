/* eslint-disable @typescript-eslint/quotes */
describe("List Users", () => {
	it("search field and table", () => {
		cy.visit("http://localhost:3005");
		cy.get("#outlined-search").type("test{Enter}");

		cy
			.get('[data-id="28"] > [data-field="user_name"] > .MuiDataGrid-cellContent')
			.should("contain", "TEST001");
		cy.get("#outlined-search").clear();
		cy.get(".MuiGrid-grid-xs-4 > .MuiButtonBase-root").click();
		cy.get('[data-id="12"] > [data-field="id"]').should("contain", "12");
	});
});
