import cors from "cors";
import express from "express";
import helmet from "helmet";
import router from "./route/userRoute";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

const PORT: Number = 3001;
const appServer = app.listen(PORT, () => {
	console.log(`Application started on port ${PORT}!`);
});

export default appServer;
