import express from "express";
import morgan from "morgan";
import "../database/databaseConnection.js";
import "../loadEnvironment.js";
import auth from "./middlewares/auth.js";
import { generalError, unknownEndpoint } from "./middlewares/errors.js";
import itemsRouter from "./Routes/itemsRouter.js";
import usersRouter from "./Routes/usersRouter.js";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/users", usersRouter);
app.use("/items", auth, itemsRouter);

app.use(generalError);
app.use(unknownEndpoint);

export default app;
