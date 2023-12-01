import mongoose from "mongoose";

export interface Pedido {
  _id?: mongoose.Types.ObjectId;
  status: "aguardando" | "em preparo" | "pronto";
  itens: Array<{ id: number; nome: string }>;
  email: string;
}
