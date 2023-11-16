import amqp from "amqplib";
import { PortQueueConnection } from "../ports/queueConnection.ts";


class AdapterQueueConnection extends PortQueueConnection {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  constructor() {
    super();
    this.connect().then(() => console.log("Connected to Queue"));
  }

  async connect() {
    this.connection = await amqp.connect("amqp://localhost:5672");
    this.channel = await this.connection.createChannel();

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
