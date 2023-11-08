import mongoose from "mongoose";
import { PortMenuDb } from "../ports/menuDb.ts";
import { ItemMenu } from "../interfaces/domain/interfaceItemMenu.ts";
import { MenuModel } from "../schemas/menuSchema.ts";



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
