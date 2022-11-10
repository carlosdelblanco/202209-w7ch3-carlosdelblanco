import express from "express";
import {
  createItems,
  getItems,
} from "../Controllers/ItemsController/ItemsController.js";

// eslint-disable-next-line new-cap
const itemsRouter = express.Router();

itemsRouter.get("/list", getItems);
itemsRouter.post("/createItem", createItems);

export default itemsRouter;
