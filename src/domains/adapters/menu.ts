import { ItemMenu } from "../../interfaces/domain/interfaceItemMenu.ts";
import { PortMenuDb } from "../../ports/menuDb.ts";
import { PortMenu } from "../ports/menu.ts";



class AdapterMenu extends PortMenu {
  constructor(private PortMenuDb: PortMenuDb) {
    super(PortMenuDb);
  }

  async retornaMenu(): Promise<Array<ItemMenu>> {
    return await this.PortMenuDb.retornaMenu();
  }

  async inserirMenu(menu: ItemMenu) {
    return await this.PortMenuDb.inserirMenu(menu);
  }
}

export { AdapterMenu };
