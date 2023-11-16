import { Pedido } from "../../interfaces/domain/interfacePedido.ts";
import { PortPedidoDb } from "../../ports/pedidoDb.ts";
import { PortProduzirPedido } from "../ports/produzirPedido.ts";

export class AdapterProduzirPedido extends PortProduzirPedido {
  constructor(private portPedidoDb: PortPedidoDb) {
    super(portPedidoDb);
  }
  async produzirPedido(pedidoId: string): Promise<void> {
    const pedido = await this.portPedidoDb.buscarPorId(pedidoId);
    console.log("Pedido recebido: ", pedidoId);
    let updatedPedido: Pedido = {
      _id: pedido?._id,
      itens: pedido?.itens || [],
      status: "em preparo",
    };

    console.log("Pedido em preparo: ", pedidoId);
    await this.portPedidoDb.atualizarPedido(updatedPedido);

    await new Promise((resolve) => setTimeout(resolve, 20000));

    updatedPedido = {
      ...updatedPedido,
      status: "pronto",
    };
    console.log("Pedido pronto: ", pedidoId);
    await this.portPedidoDb.atualizarPedido(updatedPedido);
  }
}
