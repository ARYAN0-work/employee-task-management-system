import  express  from "express";
import router from "./routes/root.routes.js";
import { notFound } from "./middleware/notFound.js";

const app = express();

app.use(express.json());

app.use(router);
app.use(notFound);

export default app;

