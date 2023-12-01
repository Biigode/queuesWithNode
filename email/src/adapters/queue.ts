import amqp from "amqplib";
import { PortMail } from "../domains/ports/mail.ts";
import { PortQueue } from "../ports/queue.ts";

class AdapterQueue extends PortQueue {
  constructor(private channel: amqp.Channel, private enviarEmail: PortMail) {
    super(channel, enviarEmail);
    this.channel = channel;
    this.enviarEmail = enviarEmail;
  }

  async consume(): Promise<void> {
    if (!this.channel) {
      throw new Error("Cannot consume on closed channel.");
    }
    await this.channel?.prefetch(1);

    await this.channel?.consume(
      "mail",
      async (message) => {
        if (message) {
          const id = JSON.parse(message.content.toString());
          console.log("Consuming message: ", id);
          await this.enviarEmail.enviarEmail(id);

          this.channel?.ack(message);
          console.log("Message consumed: ", id);
        }
      },
      { noAck: false }
    );
  }
}

export { AdapterQueue };
