import amqp from "amqplib";
import { PortQueue } from "../ports/queue.ts";
import { Queue } from "../interfaces/domain/interfaceQueue.ts";


class AdapterQueue extends PortQueue {
  constructor(private channel: amqp.Channel, private queue: string) {
    super(channel, queue);
    this.channel = channel;
    this.queue = queue;
    this.assertQueue().then(() => console.log("Queue asserted"));
  }

  private async assertQueue() {
    await this.channel.assertQueue(this.queue, {
      durable: true,
    });
  }

  async publish(message: Queue): Promise<void> {
    if (!this.channel) {
      throw new Error("Cannot publish on closed channel");
    }
    this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)));
  }
}

export { AdapterQueue };
