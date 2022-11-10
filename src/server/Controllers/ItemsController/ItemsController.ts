import type { Request, Response } from "express";
import type { ItemStructure } from "../../../database/models/Item.js";
import Item from "../../../database/models/Item.js";
import type { CustomRequest } from "../../types.js";

export const getItems = async (req: CustomRequest, res: Response) => {
  const { userId } = req;

  const items = await Item.find({ owner: userId });

  res.status(200).json({ items });
};

export const createItems = async (req: Request, res: Response) => {
  const { type, name } = req.body as unknown as ItemStructure;

  const newItem = await Item.create({
    type,
    name,
  });

  res.status(201).json({
    newItem,
  });
};
