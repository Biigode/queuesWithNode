import amqp from "amqplib";
import { PortPedidoDb } from "../../ports/pedidoDb.ts";

export abstract class PortProduzirPedido {
  constructor(portPedidoDB: PortPedidoDb, channel: amqp.Channel) {}
  abstract produzirPedido(pedido: any): Promise<void>;
}
