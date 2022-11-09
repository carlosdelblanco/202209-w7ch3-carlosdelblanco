import "../loadEnvironment.js";
import "../database/databaseConnection.js";
import express from "express";
import morgan from "morgan";
import usersRouter from "./Routes/usersRouter.js";
import { generalError, unknownEndpoint } from "./middlewares/errors.js";
import auth from "./middlewares/auth.js";
import itemsRouter from "./Routes/itemsRouter.js";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/users", usersRouter);
app.use("/items", auth, itemsRouter);

app.use(generalError);
app.use(unknownEndpoint);

export default app;
