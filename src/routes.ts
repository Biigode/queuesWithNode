import express, { Request, Response } from "express";
import { MenuComposer } from "./composers/menu.ts";
import { PedidoComposer } from "./composers/pedido.ts";
import { MenuRequest } from "./interfaces/request/menu.ts";
import { PedidoRequest } from "./interfaces/request/pedido.ts";

const routes = express.Router();
const Pedido = new PedidoComposer().compose();
const Menu = new MenuComposer().compose();

routes.get("/menu", async (request: Request, response: Response) => {
  const menu = await Menu.retornaMenu();
  return response.json({ menu }).status(200);
});

routes.post("/menu", async (request: Request, response: Response) => {
  const { description, nome, preco, id }: MenuRequest = request.body;

  const menu = await Menu.inserirMenu({ description, nome, preco, id });
  return response.json({ menu }).status(200);
});

routes.post("/pedido", async (request: Request, response: Response) => {
  const { pedido }: PedidoRequest = request.body;

  const idPedido = await Pedido.inserir({ pedido });

  return response
    .json({ mensagem: "Pedido enviado a cozinha", numeroPedido: idPedido })
    .status(200);
});

routes.get("/pedido", async (request: Request, response: Response) => {
  const { pedidoId } = request.query;

  if (!pedidoId) {
    return response.json({ mensagem: "Pedido não encontrado" }).status(404);
  }

  const pedido = await Pedido.buscar(pedidoId.toString());
  return response.json(pedido).status(200);
});

export default routes;
