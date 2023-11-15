import express from "express";
import Menu from "./menu.ts";
import Pedido from "./pedido.ts";

class Router {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    this.router.use("/menu", new Menu().getRouter());
    this.router.use("/pedido", new Pedido().getRouter());
  }
}
export default Router;
