import amqplib from "amqplib";
import { ComposerProduzirPedido } from "./composer/produzirPedido";

const pedidoComposed = new ComposerProduzirPedido();

const pedidoImplementation = pedidoComposed.compose();

(async () => {
  const connection = await amqplib.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  channel.assertQueue("pedidos", {});

  channel.consume(
    "pedidos",
    async (message) => {
      if (message) {
        const pedido = JSON.parse(message.content.toString());
        const pedidoProduzido = pedidoImplementation.produzirPedido(pedido);
        console.log(pedidoProduzido);
        channel.ack(message);
      }
    },
    { noAck: false }
  );
})();
