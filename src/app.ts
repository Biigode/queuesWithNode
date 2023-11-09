import express from "express";
import mongoose from "mongoose";
import Router from "./routes/index.ts";

await mongoose.connect("mongodb://localhost:27017/burguer");

const app = express();

app.use(express.json());
app.use("/", new Router().router);

const server = app.listen(3000, () => {
  console.log("Burger API started!");
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received. Shutting down gracefully.");
  server.close(() => {
    console.log("Server closed");
    mongoose.connection.close(false).then(() => {
      console.log("MongoDb connection closed.");
    });
  });
  process.exit(0);
});
