import { MenuRepository } from "src/models/db/menuRepository.ts";
import { PedidoRepository } from "src/models/db/pedidoRepository.ts";
import { PedidoRequest } from "src/models/requests/pedido.ts";
import { QueueRepository } from "src/queue/queueRepository.ts";


class PedidoUseCase {
  constructor(
    private PedidoRepository: PedidoRepository,
    private MenuRepository: MenuRepository,
    private QueueRepository: QueueRepository
  ) {}
  async inserir(pedido: PedidoRequest): Promise<string> {
    const itensDoPedido = pedido.pedido.map(async (item) => {
      const menu = await this.MenuRepository.buscarPorId(item.id);
      if (!menu) {
        throw new Error("Menu não encontrado");
      }
      return menu;
    });

    const itens = await Promise.all(itensDoPedido);

    const itensFiltrados = itens.map((item) => ({
      id: item.id,
      nome: item.nome,
    }));

    const pedidoCriado = await this.PedidoRepository.inserir({
      status: "aguardando",
      itens: itensFiltrados,
    });

    await this.QueueRepository.publish({ _id: pedidoCriado });

    return pedidoCriado;
  }

  async buscar(id: string) {
    return await this.PedidoRepository.buscarPorId(id);
  }
}

export { PedidoUseCase };
