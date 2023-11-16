import { Pedido } from "../interfaces/domain/interfacePedido.ts";
import { PedidoModel } from "../interfaces/schemas/pedidoSchema.ts";
import { PortPedidoDb } from "../ports/pedidoDb.ts";

class AdapterPedidoDb extends PortPedidoDb {
  async buscarPorId(id: string): Promise<Pedido | null> {
    return await PedidoModel.findOne({ _id: id }).exec();
  }

  async atualizarPedido(pedido: Pedido): Promise<void> {
    await PedidoModel.findByIdAndUpdate({ _id: pedido._id }, pedido).exec();
  }
}

export { AdapterPedidoDb };
