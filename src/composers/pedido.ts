import { AdapterMenuDb } from "../adapters/menuDb.ts";
import { AdapterPedidoDb } from "../adapters/pedidoDb.ts";
import { AdapterQueue } from "../adapters/queue.ts";
import { QueueChannel } from "../app.ts";
import { AdapterPedido } from "../domains/adapters/pedido.ts";
import { PortPedido } from "../domains/ports/pedido.ts";

export class PedidoComposer {
  compose(): PortPedido {
    const pedidoDb = new AdapterPedidoDb();
    const menuDb = new AdapterMenuDb();
    const queue = new AdapterQueue(QueueChannel, "pedidos");
    const pedido = new AdapterPedido(pedidoDb, menuDb, queue);
    return pedido;
  }
}
