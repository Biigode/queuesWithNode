import amqp from "amqplib";
import { Queue } from "src/models/interfaceQueue.ts";
class QueueRepository {
  constructor(private channel: amqp.Channel, private queue: string) {
    this.channel = channel;
    this.queue = queue;
    this.assertQueue().then(() => console.log("Queue asserted"));
  }

  private async assertQueue() {
    await this.channel.assertQueue(this.queue, {
      durable: true,
    });
  }

  async publish(message: Queue) {
    if (!this.channel) {
      throw new Error("Cannot publish on closed channel");
    }
    this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)));
  }
}

export { QueueRepository };
