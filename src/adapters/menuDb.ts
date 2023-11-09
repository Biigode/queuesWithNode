import mongoose from "mongoose";
import { ItemMenu } from "../interfaces/domain/interfaceItemMenu.ts";
import { MenuModel } from "../interfaces/schemas/menuSchema.ts";
import { PortMenuDb } from "../ports/menuDb.ts";

class AdapterMenuDb extends PortMenuDb {
  async inserirMenu(menu: ItemMenu): Promise<ItemMenu> {
    return await MenuModel.create<ItemMenu>({
      ...menu,
      _id: new mongoose.Types.ObjectId(),
    });
  }

  async retornaMenu(): Promise<ItemMenu[]> {
    return await MenuModel.find({}).exec();
  }

  async buscarPorId(id: number): Promise<ItemMenu | null> {
    return await MenuModel.findOne({ id }).exec();
  }
}

export { AdapterMenuDb };
