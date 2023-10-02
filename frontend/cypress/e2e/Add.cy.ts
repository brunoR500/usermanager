/* eslint-disable @typescript-eslint/quotes */
describe("Add User", () => {
	it("create new user", () => {
		const rUser = Math.floor(Math.random() * 100000);
		cy.visit("http://localhost:3005/add");
		cy.get("#cy-uname").type(`cyUser${rUser}`);
		cy.get("#cy-fname").type("cyUserF");
		cy.get("#cy-lname").type("cyUserL");
		cy.get("#cy-email").type("cyuser@email.com");
		cy.get("#cy-birthday").type("2009-12-12");
		cy.get("#cy-pswd").type("secret");
		cy.get("#cy-rpswd").type("secret");
		cy.get("#cy-sub-add").click();
		cy.get(".MuiSnackbar-root > .MuiPaper-root");
		cy.get("#cy-uname").should("be.empty");
		cy.get(".MuiAlert-message").should("contain", "The new user is created!");
	});

	it("create new user - wrong password", () => {
		const rUser = Math.floor(Math.random() * 100000);
		cy.visit("http://localhost:3005/add");
		cy.get("#cy-uname").type(`cyUser${rUser}`);
		cy.get("#cy-fname").type("cyUserF");
		cy.get("#cy-lname").type("cyUserL");
		cy.get("#cy-email").type("cyuser@email.com");
		cy.get("#cy-birthday").type("2009-12-12");
		cy.get("#cy-pswd").type("secret");
		cy.get("#cy-rpswd").type("secreta");
		cy.get("#cy-sub-add").click();
		cy.get("#cy-uname").should("have.value", `cyUser${rUser}`);
		cy.get("#cy-rpswd-helper-text").should("contain", "Password do not match");
	});

	it("create new user - re-submit after wrong password", () => {
		const rUser = Math.floor(Math.random() * 100000);
		cy.visit("http://localhost:3005/add");
		cy.get("#cy-uname").type(`cyUser${rUser}`);
		cy.get("#cy-fname").type("cyUserF");
		cy.get("#cy-lname").type("cyUserL");
		cy.get("#cy-email").type("cyuser@email.com");
		cy.get("#cy-birthday").type("2009-12-12");
		cy.get("#cy-pswd").type("secret");
		cy.get("#cy-rpswd").type("secreta");
		cy.get("#cy-sub-add").click();
		cy.get("#cy-rpswd").clear();
		cy.get("#cy-rpswd").type("secret");
		cy.get("#cy-sub-add").click();
		cy.get(".MuiSnackbar-root > .MuiPaper-root");
		cy.get("#cy-uname").should("be.empty");
		cy.get(".MuiAlert-message").should("contain", "The new user is created!");
	});

	it("create new user - re-submit after wrong password and find user in listuser", () => {
		const rUser = Math.floor(Math.random() * 100000);
		cy.visit("http://localhost:3005/add");
		cy.get("#cy-uname").type(`cyUser${rUser}`);
		cy.get("#cy-fname").type("cyUserF");
		cy.get("#cy-lname").type("cyUserL");
		cy.get("#cy-email").type("cyuser@email.com");
		cy.get("#cy-birthday").type("2009-12-12");
		cy.get("#cy-pswd").type("secret");
		cy.get("#cy-rpswd").type("secre");
		cy.get("#cy-sub-add").click();
		cy.get("#cy-rpswd").type("t");
		cy.get("#cy-sub-add").click();
		cy.get(".MuiSnackbar-root > .MuiPaper-root");
		cy.get("#cy-uname").should("be.empty");
		cy.get(".MuiAlert-message").should("contain", "The new user is created!");
		// find user
		cy.visit("http://localhost:3005");
		cy.get("#outlined-search").type(`cyUser${rUser}{Enter}`);
		cy
			.get('[data-field="user_name"] > .MuiDataGrid-cellContent')
			.should("contain", `cyUser${rUser}`);
		cy.get("#outlined-search").clear();
		cy.get(".MuiGrid-grid-xs-4 > .MuiButtonBase-root").click();
	});

	it("Insert User with already existent Username", () => {
		const rUser = Math.floor(Math.random() * 100000);
		cy.visit("http://localhost:3005/add");
		cy.get("#cy-uname").type(`cyUser${rUser}`);
		cy.get("#cy-fname").type("cyUserF");
		cy.get("#cy-lname").type("cyUserL");
		cy.get("#cy-email").type("cyuser@email.com");
		cy.get("#cy-birthday").type("2009-12-12");
		cy.get("#cy-pswd").type("secret");
		cy.get("#cy-rpswd").type("secret");
		cy.get("#cy-sub-add").click();
		cy.get(".MuiSnackbar-root > .MuiPaper-root");
		cy.get("#cy-uname").should("be.empty");
		cy.get(".MuiAlert-message").should("contain", "The new user is created!");
		cy.get("#cy-uname").type(`cyUser${rUser}`);
		cy.get("#cy-fname").type("cyUserF");
		cy.get("#cy-lname").type("cyUserL");
		cy.get("#cy-email").type("cyuser@email.com");
		cy.get("#cy-birthday").type("2009-12-12");
		cy.get("#cy-pswd").type("secret");
		cy.get("#cy-rpswd").type("secret");
		cy.get("#cy-sub-add").click();
		cy
			.get("#cy-uname-helper-text")
			.should("contain", "Username is already used!");
	});
});
