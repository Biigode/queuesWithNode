import express from "express";
import mongoose from "mongoose";
import routes from "./routes.ts";

const app = express();

app.use(express.json());
app.use(routes);

await mongoose.connect("mongodb://localhost:27017/burguer");

app.listen(3000, () => {
  console.log("Burger API started!");
});
