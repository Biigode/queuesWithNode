import amqp from "amqplib";
import { PortProduzirPedido } from "../domains/ports/produzirPedido.ts";

export abstract class PortQueue {
  constructor(channel: amqp.Channel, produzirPedido: PortProduzirPedido) {}
  abstract consume(): Promise<void>;
}
