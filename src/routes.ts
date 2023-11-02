import express, { Request, Response } from "express";
import { MenuRepository } from "./models/db/menuRepository.ts";
import { PedidoRepository } from "./models/db/pedidoRepository.ts";
import { MenuRequest } from "./models/requests/menu.ts";
import { PedidoRequest } from "./models/requests/pedido.ts";
import { MenuUseCase } from "./useCase/menu.ts";
import { PedidoUseCase } from "./useCase/pedido.ts";

const routes = express.Router();

routes.get("/menu", async (request: Request, response: Response) => {
  const menuRepository = new MenuRepository();
  const menuUseCase = new MenuUseCase(menuRepository);
  const menu = await menuUseCase.retornaMenu();
  return response.json({ menu }).status(200);
});

routes.post("/menu", async (request: Request, response: Response) => {
  const { description, nome, preco, id }: MenuRequest = request.body;
  const menuRepository = new MenuRepository();
  const menuUseCase = new MenuUseCase(menuRepository);
  const menu = await menuUseCase.inserirMenu({ description, nome, preco, id });
  return response.json({ menu }).status(200);
});

routes.post("/pedido", async (request: Request, response: Response) => {
  const { pedido }: PedidoRequest = request.body;
  const pedidoRepository = new PedidoRepository();
  const menuRepository = new MenuRepository();
  const pedidoUseCase = new PedidoUseCase(pedidoRepository, menuRepository);

  const idPedido = await pedidoUseCase.inserir({ pedido });

  return response
    .json({ mensagem: "Pedido enviado a cozinha", numeroPedido: idPedido })
    .status(200);
});

routes.get("/pedido", async (request: Request, response: Response) => {
  const { pedidoId } = request.query;

  if (!pedidoId) {
    return response.json({ mensagem: "Pedido não encontrado" }).status(404);
  }
  const pedidoRepository = new PedidoRepository();
  const menuRepository = new MenuRepository();
  const pedidoUseCase = new PedidoUseCase(pedidoRepository, menuRepository);

  const pedido = await pedidoUseCase.buscar(pedidoId.toString());
  return response.json(pedido).status(200);
});

export default routes;
