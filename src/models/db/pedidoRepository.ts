import mongoose from "mongoose";
import { Pedido } from "../interfacePedido.ts";
import { PedidoModel } from "./pedidoSchema.ts";

class PedidoRepository {
  constructor() {}
  async inserir(pedido: Pedido): Promise<string> {
    const pedidoCriado = await PedidoModel.create({
      ...pedido,
      _id: new mongoose.Types.ObjectId(),
    });

    return pedidoCriado._id.toString();
  }

  async buscarPorId(id: string): Promise<Pedido | null> {
    return await PedidoModel.findOne({ _id: id }).exec();
  }
}

export { PedidoRepository };
