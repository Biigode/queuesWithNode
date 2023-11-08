import ampq from "amqplib";
export abstract class PortQueueConnection {
  constructor() {}
  abstract connect(): Promise<ampq.Channel>;
  abstract close(): Promise<void>;
}
