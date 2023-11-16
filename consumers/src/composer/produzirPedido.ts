import { AdapterProduzirPedido } from "../domains/adapters/produzirPedido";
import { PortProduzirPedido } from "../domains/ports/produzirPedido";

export class ComposerProduzirPedido {
    compose(): PortProduzirPedido {
        return new AdapterProduzirPedido();
    }
}