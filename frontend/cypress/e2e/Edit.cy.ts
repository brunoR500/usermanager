/* eslint-disable @typescript-eslint/quotes */
describe("Edit User", () => {
	it("edit a user", () => {
		cy.visit("http://localhost:3005");
		// Add new user
		const newUser = "TOEDIT";
		cy.visit("http://localhost:3005/add");
		cy.get("#cy-uname").type(newUser);
		cy.get("#cy-fname").type("cyUserF");
		cy.get("#cy-lname").type("cyUserL");
		cy.get("#cy-email").type("cyuser@email.com");
		cy.get("#cy-birthday").type("2009-12-12");
		cy.get("#cy-pswd").type("secret");
		cy.get("#cy-rpswd").type("secret");
		cy.get("#cy-sub-add").click();
		cy.get(".MuiSnackbar-root > .MuiPaper-root");
		cy.get("#cy-uname").should("be.empty");
		// Search User in ListUser
		cy.visit("http://localhost:3005");
		cy.get("#outlined-search").type(`${newUser}{Enter}`);

		cy
			.get('[data-field="user_name"] > .MuiDataGrid-cellContent')
			.should("contain", `${newUser}`);
		cy
			.get(
				".MuiDataGrid-cell--withRenderer.MuiDataGrid-cell--textLeft > div > .links > .MuiButtonBase-root"
			)
			.click();
		// Edit
		const editUser = Math.floor(Math.random() * 100000);
		cy.get("#cy-uname").clear();
		cy.get("#cy-uname").type(`TOEDIT_new${editUser}`);
		cy.get("#cy-pswd").type("secret");
		cy.get("#cy-rpswd").type("secret");
		cy.get("#cy-sub-edit").click();
		// Snackbar
		// FIXME: the snackbar does not work properly
		// cy.get(".MuiSnackbar-root > .MuiPaper-root");

		// check if the user is update
		cy.get('[href="/"] > .MuiButtonBase-root').click();
		cy.visit("http://localhost:3005");
		cy.get("#outlined-search").type(`TOEDIT_new${editUser}{Enter}`);
		cy
			.get('[data-field="user_name"] > .MuiDataGrid-cellContent')
			.should("contain", `TOEDIT_new${editUser}`);
		cy.get(".MuiButton-textWarning").click();
	});
});
