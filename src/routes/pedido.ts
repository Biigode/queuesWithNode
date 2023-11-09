import express, { Request, Response } from "express";
import { PedidoComposer } from "../composers/pedido.ts";
import { PortPedido } from "../domains/ports/pedido.ts";
import { PedidoRequest } from "../interfaces/request/pedido.ts";

class PedidoRouter {
  private router = express.Router();
  private Pedido!: PortPedido;

  constructor() {
    new PedidoComposer()
      .compose()
      .then((pedido) => {
        this.Pedido = pedido;
      })
      .catch((err) => {
        throw err;
      });
    this.router.post("/", this.post);
    this.router.get("/", this.get);
  }

  private post = async (request: Request, response: Response) => {
    const { pedido }: PedidoRequest = request.body;
    const idPedido = await this.Pedido.inserir({ pedido });
    return response
      .json({ mensagem: "Pedido enviado a cozinha", numeroPedido: idPedido })
      .status(200);
  };

  private get = async (request: Request, response: Response) => {
    const { pedidoId } = request.query;
    if (!pedidoId) {
      return response.json({ mensagem: "Pedido não encontrado" }).status(404);
    }
    const pedido = await this.Pedido.buscar(pedidoId.toString());
    return response.json(pedido).status(200);
  };

  public getRouter() {
    return this.router;
  }
}

export default PedidoRouter;
