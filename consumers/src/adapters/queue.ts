import amqp from "amqplib";
import { PortProduzirPedido } from "../domains/ports/produzirPedido.ts";
import { Queue } from "../interfaces/domain/interfaceQueue.ts";
import { PortQueue } from "../ports/queue.ts";

class AdapterQueue extends PortQueue {
  constructor(
    private channel: amqp.Channel,
    private produzirPedido: PortProduzirPedido
  ) {
    super(channel, produzirPedido);
    this.channel = channel;
    this.produzirPedido = produzirPedido;
  }

  async consume(): Promise<void> {
    if (!this.channel) {
      throw new Error("Cannot consume on closed channel.");
    }
    await this.channel?.prefetch(1);

    await this.channel?.consume(
      "pedidos",
      async (message) => {
        if (message) {
          const pedido = JSON.parse(message.content.toString());
          console.log("Consuming message: ", pedido);
          await this.produzirPedido.produzirPedido(pedido);

          this.channel?.ack(message);
          console.log("Message consumed: ", pedido);
        }
      },
      { noAck: false }
    );
  }

  async publish(queue: string, message: Queue): Promise<void> {
    if (!this.channel) {
      throw new Error("Cannot publish on closed channel");
    }
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }
}

export { AdapterQueue };
