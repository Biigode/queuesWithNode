import { AdapterMenuDb } from "../adapters/menuDb.ts";
import { AdapterPedidoDb } from "../adapters/pedidoDb.ts";
import { AdapterQueue } from "../adapters/queue.ts";
import { AdapterQueueConnection } from "../adapters/queueConnection.ts";
import { AdapterPedido } from "../domains/adapters/pedido.ts";
import { PortPedido } from "../domains/ports/pedido.ts";

export class PedidoComposer {
  async compose(): Promise<PortPedido> {
    const pedidoDb = new AdapterPedidoDb();
    const menuDb = new AdapterMenuDb();
    const channel = await new AdapterQueueConnection().connect();

    const queue = new AdapterQueue(channel, "pedidos");
    const pedido = new AdapterPedido(pedidoDb, menuDb, queue);
    return pedido;
  }
}
