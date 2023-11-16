import { AdapterPedidoDb } from "../adapters/pedidoDb.ts";
import { AdapterProduzirPedido } from "../domains/adapters/produzirPedido.ts";
import { PortProduzirPedido } from "../domains/ports/produzirPedido.ts";

export class ComposerProduzirPedido {
  compose(): PortProduzirPedido {

    return new AdapterProduzirPedido(new AdapterPedidoDb());
  }
}
