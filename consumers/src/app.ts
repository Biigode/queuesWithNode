import mongoose from "mongoose";
import { AdapterQueue } from "./adapters/queue.ts";
import { AdapterQueueConnection } from "./adapters/queueConnection.ts";
import { ComposerProduzirPedido } from "./composer/produzirPedido.ts";

(async () => {
  console.log("Starting consumer...");
  await mongoose.connect("mongodb://localhost:27017/burguer");

  const pedidoImplementation = new ComposerProduzirPedido().compose();
  const queueAdapter = new AdapterQueueConnection();

  await queueAdapter.connect();
  await queueAdapter.assertQueue("pedidos");

  const consumerAdapter = new AdapterQueue(
    queueAdapter.channel!,
    pedidoImplementation
  );

  await consumerAdapter.consume();

  process.on("SIGTERM", () => {
    console.log("SIGTERM signal received. Shutting down gracefully.");
    mongoose.connection.close(false).then(() => {
      console.log("MongoDb connection closed.");
    });
    queueAdapter.close().then(() => {
      console.log("Queue connection closed.");
    });
    process.exit(0);
  });
})();
