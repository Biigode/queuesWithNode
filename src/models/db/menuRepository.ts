import mongoose from "mongoose";
import { ItemMenu } from "../interfaceItemMenu.ts";
import { MenuModel } from "./menuSchema.ts";

class MenuRepository {
  async inserir(menu: ItemMenu): Promise<void> {
    await MenuModel.create<ItemMenu>({
      ...menu,
      _id: new mongoose.Types.ObjectId(),
    });
  }

  async buscar(): Promise<ItemMenu[]> {
    return await MenuModel.find({}).exec();
  }

  async buscarPorId(id: number): Promise<ItemMenu | null> {
    return await MenuModel.findOne({ id }).exec();
  }
}

export { MenuRepository };
