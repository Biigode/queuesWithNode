import { Schema, model } from "mongoose";
import { ItemMenu } from "../domain/interfaceItemMenu.ts";

const ObjectId = Schema.ObjectId;

const MenuSchema = new Schema<ItemMenu>({
  _id: ObjectId,
  id: Number,
  description: String,
  nome: String,
  preco: Number,
});

export const MenuModel = model<ItemMenu>("Menu", MenuSchema);
