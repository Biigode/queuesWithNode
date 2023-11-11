
import { Pedido } from "../../interfaces/domain/interfacePedido.ts";
import { PedidoRequest } from "../../interfaces/request/pedido.ts";
import { PortMenuDb } from "../../ports/menuDb.ts";
import { PortPedidoDb } from "../../ports/pedidoDb.ts";
import { PortQueue } from "../../ports/queue.ts";
import { PortPedido } from "../ports/pedido.ts";



class AdapterPedido extends PortPedido {
  constructor(
    private PortPedidoDb: PortPedidoDb,
    private PortMenuDb: PortMenuDb,
    private PortQueue: PortQueue
  ) {
    super(PortPedidoDb, PortMenuDb, PortQueue);
  }

  async inserir(pedido: PedidoRequest): Promise<string> {
    const itensDoPedido = pedido.pedido.map(async (item) => {
      const menu = await this.PortMenuDb.buscarPorId(item.id);
      if (!menu) {
        throw new Error("Item do menu não encontrado");
      }
      return menu;
    });

    const itens = await Promise.all(itensDoPedido);

    const itensFiltrados = itens.map((item) => ({
      id: item.id,
      nome: item.nome,
    }));

    const pedidoCriado = await this.PortPedidoDb.inserirPedido({
      status: "aguardando",
      itens: itensFiltrados,
    });

    await this.PortQueue.publish({ _id: pedidoCriado });

    return pedidoCriado;
  }

  async buscar(id: string): Promise<Pedido | null> {
    return await this.PortPedidoDb.buscarPorId(id);
  }
}

export { AdapterPedido };
