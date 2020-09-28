import express, { urlencoded } from "express";
import indexRoutes from "./routes/index.routes";

const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//routes
app.use(indexRoutes);

export default app;
