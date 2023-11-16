import { PortProduzirPedido } from "../ports/produzirPedido";

export class AdapterProduzirPedido extends PortProduzirPedido {
  async produzirPedido(pedido: any): Promise<void> {
    console.log("Produzindo pedido", pedido);
  }
}
