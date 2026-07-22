import  express  from "express";
import router from "./routes/root.routes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use(router);
app.use(notFound);
app.use(errorHandler)

export default app;

