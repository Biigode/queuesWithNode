import { Schema, model } from "mongoose";
import { Pedido } from "../domain/interfacePedido.ts";

const ObjectId = Schema.ObjectId;
const PedidoSchema = new Schema<Pedido>({
  _id: ObjectId,
  status: {
    type: String,
    enum: ["aguardando", "em preparo", "pronto"],
    default: "aguardando",
  },
  itens: [
    {
      id: Number,
      nome: String,
    },
  ],
});
export type PedidoSchemaType = Pedido & Document;
export const PedidoModel = model<Pedido>("Pedido", PedidoSchema);
