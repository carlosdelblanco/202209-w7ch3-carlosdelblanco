import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const Item = model("Item", itemSchema, "items");

export default Item;
