import mongoose from "mongoose";
import { Pedido } from "../interfaces/domain/interfacePedido.ts";
import { PedidoModel } from "../interfaces/schemas/pedidoSchema.ts";
import { PortPedidoDb } from "../ports/pedidoDb.ts";

class AdapterPedidoDb extends PortPedidoDb {
  async inserirPedido(pedido: Pedido): Promise<string> {
    const pedidoCriado = await PedidoModel.create({
      ...pedido,
      _id: new mongoose.Types.ObjectId(),
    });

    return pedidoCriado._id.toString();
  }

  async buscarPorId(id: string): Promise<Pedido | null> {
    return await PedidoModel.findOne({ _id: id }).exec();
  }

  async atualizarPedido(pedido: Pedido): Promise<void> {
    await PedidoModel.findByIdAndUpdate({ _id: pedido._id }, pedido).exec();
  }
}

export { AdapterPedidoDb };
