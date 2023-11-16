export abstract class PortProduzirPedido {
  abstract produzirPedido(pedido: any): Promise<void>;
}
