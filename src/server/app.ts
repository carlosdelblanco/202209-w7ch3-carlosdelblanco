import "../loadEnvironment.js";
import "../database/databaseConnection.js";
import express from "express";
import morgan from "morgan";
import usersRouter from "./Routes/usersRouter.js";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(200).json({ message: "Hola mundo" });
});

export default app;
