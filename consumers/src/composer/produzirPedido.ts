import { AdapterPedidoDb } from "../adapters/pedidoDb.ts";
import { AdapterQueueConnection } from "../adapters/queueConnection.ts";
import { AdapterProduzirPedido } from "../domains/adapters/produzirPedido.ts";
import { PortProduzirPedido } from "../domains/ports/produzirPedido.ts";

export class ComposerProduzirPedido {
  async compose(): Promise<PortProduzirPedido> {
    return new AdapterProduzirPedido(
      new AdapterPedidoDb(),
      await new AdapterQueueConnection().connect()
    );
  }
}
