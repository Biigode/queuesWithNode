
import { Pedido } from "../../interfaces/domain/interfacePedido.ts";
import { PedidoRequest } from "../../interfaces/request/pedido.ts";
import { PortMenuDb } from "../../ports/menuDb.ts";
import { PortPedidoDb } from "../../ports/pedidoDb.ts";
import { PortQueue } from "../../ports/queue.ts";


export abstract class PortPedido {
  constructor(
    PortPedidoDb: PortPedidoDb,
    PortMenuDb: PortMenuDb,
    PortQueue: PortQueue
  ) {}
  abstract inserir(pedido: PedidoRequest): Promise<string>;
  abstract buscar(id: string): Promise<Pedido | null>;
}
