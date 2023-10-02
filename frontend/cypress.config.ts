import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		// baseUrl: "https://studio.miloncare.test",
		// specPattern: "cypress/e2e/**/*.spec.ts",
	},
	video: false,
	projectId: "myproject",
	viewportWidth: 1800,
	viewportHeight: 1180,
	// retries: { runMode: 2, openMode: 0 },
});
