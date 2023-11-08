import express from "express";
import mongoose from "mongoose";
import { AdapterQueueConnection } from "./adapters/queueConnection.ts";
import routes from "./routes.ts";

await mongoose.connect("mongodb://localhost:27017/burguer");
const channel = await new AdapterQueueConnection().connect();
export { channel as QueueChannel };

const app = express();


app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log("Burger API started!");
});
