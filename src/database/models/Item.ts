import type { InferSchemaType } from "mongoose";
import { model, Schema } from "mongoose";

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
  picture: {
    type: String,
    required: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: false,
  },
});

export type ItemStructure = InferSchemaType<typeof itemSchema>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const Item = model("Item", itemSchema, "items");

export default Item;
