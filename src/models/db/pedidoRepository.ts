import mongoose from "mongoose";
import { Pedido } from "../interfacePedido.ts";
import { MenuRepository } from "./menuRepository.ts";
import { PedidoModel } from "./pedidoSchema.ts";

class PedidoRepository {
  constructor(private MenuRepository: MenuRepository) {}
  async inserir(pedido: Pedido): Promise<void> {
    const itensDoPedido = pedido.itens.map(async (item) => {
      const menu = await this.MenuRepository.buscarPorId(item.id);
      if (!menu) {
        throw new Error("Menu não encontrado");
      }
      return menu;
    });

    const itens = await Promise.all(itensDoPedido);

    await PedidoModel.create<Pedido>({
      ...pedido,
      itens: itens.map((item) => ({
        id: item.id,
        nome: item.nome,
      })),
      _id: new mongoose.Types.ObjectId(),
    });
  }

  async buscarPorId(id: string): Promise<Pedido | null> {
    return await PedidoModel.findOne({ _id: id }).exec();
  }
}

export { PedidoRepository };
