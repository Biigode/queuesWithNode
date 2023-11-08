import { Pedido } from "../interfaces/domain/interfacePedido.ts";

export abstract class PortPedidoDb {
    abstract inserirPedido(pedido: Pedido): Promise<string>;
    abstract buscarPorId(id: string): Promise<Pedido | null>;
}