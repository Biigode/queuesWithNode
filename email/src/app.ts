import mongoose from "mongoose";
import { ComposerMail } from "./composers/mail.ts";
import { AdapterQueueConnection } from "./adapters/queueConnection.ts";
import { AdapterQueue } from "./adapters/queue.ts";

(async () => {
  console.log("Start mailer...");
  await mongoose.connect("mongodb://localhost:27017/burguer");

  const mailImplementation = new ComposerMail().compose();
  const queueAdapter = new AdapterQueueConnection();

  await queueAdapter.connect();
  await queueAdapter.assertQueue("mail");

  const consumerAdapter = new AdapterQueue(
    queueAdapter.channel!,
    mailImplementation
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
