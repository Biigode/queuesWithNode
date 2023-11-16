import amqp from "amqplib";
import { Queue } from "../interfaces/domain/interfaceQueue.ts";

export abstract class PortQueue {
  constructor(channel: amqp.Channel, queue: string) {}
  abstract consume(message: Queue): Promise<void>;
}
