import { ItemMenu } from "../interfaces/domain/interfaceItemMenu.ts";

export abstract class PortMenuDb {
    abstract inserirMenu(menu: ItemMenu): Promise<ItemMenu>;
    abstract retornaMenu(): Promise<Array<ItemMenu>>;
    abstract buscarPorId(id: number): Promise<ItemMenu | null>;
}