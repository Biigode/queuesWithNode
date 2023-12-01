import amqp from "amqplib";
import { PortQueueConnection } from "../ports/queueConnection.ts";

class AdapterQueueConnection extends PortQueueConnection {
  private connection: amqp.Connection | null = null;
  channel: amqp.Channel | null = null;

  constructor() {
    super();
  }

  async connect(): Promise<amqp.Channel> {
    this.connection = await amqp.connect("amqp://localhost:5672");
    this.channel = await this.connection.createChannel();
    console.log("Connected to queue...");
    return this.channel;
  }

  async assertQueue(queue: string): Promise<amqp.Channel> {
    if (!this.channel) {
      throw new Error("Cannot assert on closed channel");
    }
    await this.channel.assertQueue(queue, {
      durable: true,
    });
    
    this.channel.assertQueue(queue, {});
    console.log("Asserted to queue...");
    return this.channel;
  }

  async close() {
    if (!this.channel || !this.connection) {
      throw new Error("Cannot close on closed channel");
    }
    await this.channel.close();
    await this.connection.close();
  }
}

export { AdapterQueueConnection };
