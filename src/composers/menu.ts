import { AdapterMenuDb } from "../adapters/menuDb.ts";
import { AdapterMenu } from "../domains/adapters/menu.ts";
import { PortMenu } from "../domains/ports/menu.ts";

export class MenuComposer {
  compose(): PortMenu {
    const menuDb = new AdapterMenuDb();
    const menu = new AdapterMenu(menuDb);
    return menu;
  }
}
