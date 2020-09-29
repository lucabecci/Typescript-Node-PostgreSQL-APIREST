import express, { urlencoded } from "express";
import indexRoutes from "./routes/index.routes";
import cors from 'cors'

const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
//routes
app.use(indexRoutes);

export default app;
