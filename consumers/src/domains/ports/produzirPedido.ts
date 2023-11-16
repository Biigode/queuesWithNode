import { PortPedidoDb } from "../../ports/pedidoDb.ts";

export abstract class PortProduzirPedido {
  constructor(portPedidoDB: PortPedidoDb) {}
  abstract produzirPedido(pedido: any): Promise<void>;
}
