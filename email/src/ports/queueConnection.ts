import amqp from "amqplib";
export abstract class PortQueueConnection {
  channel: amqp.Channel | null = null;
  constructor() {}
  abstract connect(): Promise<amqp.Channel>;
  abstract assertQueue(queue: string): Promise<amqp.Channel>;
  abstract close(): Promise<void>;
}
