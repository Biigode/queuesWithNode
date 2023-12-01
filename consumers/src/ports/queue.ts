import amqp from "amqplib";
import { PortProduzirPedido } from "../domains/ports/produzirPedido.ts";
import { Queue } from "../interfaces/domain/interfaceQueue.ts";

export abstract class PortQueue {
  constructor(channel: amqp.Channel, produzirPedido: PortProduzirPedido) {}
  abstract consume(): Promise<void>;
  abstract publish(queue: string, message: Queue): Promise<void>;
}
