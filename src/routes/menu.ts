import express, { Request, Response, Router } from "express";
import { MenuComposer } from "../composers/menu.ts";
import { PortMenu } from "../domains/ports/menu.ts";
import { MenuRequest } from "../interfaces/request/menu.ts";

class MenuRouter {
  private router: Router;
  private Menu: PortMenu;

  constructor() {
    this.router = express.Router();
    this.Menu = new MenuComposer().compose();
    this.router.get("/", this.get);
    this.router.post("/", this.post);
  }

  private get = async (request: Request, response: Response) => {
    const menu = await this.Menu.retornaMenu();
    return response.json({ menu }).status(200);
  };

  private post = async (request: Request, response: Response) => {
    const { description, nome, preco, id }: MenuRequest = request.body;
    const menu = await this.Menu.inserirMenu({ description, nome, preco, id });
    return response.json({ menu }).status(200);
  };

  public getRouter() {
    return this.router;
  }
}

export default MenuRouter;
