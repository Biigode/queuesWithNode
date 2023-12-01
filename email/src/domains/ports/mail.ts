import { PortPedidoDb } from "../../ports/pedidoDb.ts";

export abstract class PortMail {
  constructor(portPedidoDB: PortPedidoDb) {}
  abstract enviarEmail(id: string): Promise<void>;
}
