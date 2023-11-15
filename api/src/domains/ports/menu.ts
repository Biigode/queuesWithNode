
import { ItemMenu } from "../../interfaces/domain/interfaceItemMenu.ts";
import { PortMenuDb } from "../../ports/menuDb.ts";

export abstract class PortMenu {
  constructor(PortMenuDb: PortMenuDb) {}
  abstract retornaMenu(): Promise<Array<ItemMenu>>;
  abstract inserirMenu(menu: ItemMenu): Promise<ItemMenu>;
}
