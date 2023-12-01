import { Pedido } from "../interfaces/domain/interfacePedido.ts";

export abstract class PortPedidoDb {
  abstract buscarPorId(id: string): Promise<Pedido | null>;
  abstract atualizarPedido(pedido: Pedido): Promise<void>;
}
