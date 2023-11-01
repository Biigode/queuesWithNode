import express, { Request, Response } from "express";
import { MenuRepository } from "./models/db/menuRepository.ts";
import { ItemMenu } from "./models/interfaceItemMenu.ts";
import { MenuUseCase } from "./useCase/menu.ts";

const routes = express.Router();

routes.get("/menu", async (request: Request, response: Response) => {
  const menuRepository = new MenuRepository();
  const menuUseCase = new MenuUseCase(menuRepository);
  const menu = await menuUseCase.retornaMenu();
  return response.json({ menu });
});

routes.post("/menu", async (request: Request, response: Response) => {
  const { description, nome, preco, id }: ItemMenu = request.body;
  const menuRepository = new MenuRepository();
  const menuUseCase = new MenuUseCase(menuRepository);
  const menu = await menuUseCase.inserirMenu({ description, nome, preco, id });
  return response.json({ menu });
});

routes.post("/pedido", (request: Request, response: Response) => {
  //TODO - Implementar a rota de pedido e a instância do pedidoUseCase
  const { pedidos } = request.body;
  
  return response.json({ message: "Hello World" });
});

routes.get("/pedido", (request: Request, response: Response) => {
  //TODO - Implementar a rota de pedido e a instância do pedidoUseCase
  return response.json({ message: "Hello World" });
});

export default routes;
