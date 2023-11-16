import mongoose from "mongoose";

export interface ItemMenu {
  _id?: mongoose.Types.ObjectId;
  id: number;
  nome: string;
  preco: number;
  description: string;
}
