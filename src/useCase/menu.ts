import { MenuRepository } from "src/models/db/menuRepository.ts";
import { ItemMenu } from "src/models/interfaceItemMenu.ts";

class MenuUseCase {
    constructor(private menuRepository: MenuRepository) {}
    
    async retornaMenu(): Promise<Array<ItemMenu>> {
        return await this.menuRepository.buscar();
    }

    async inserirMenu(menu: ItemMenu) {
        return await this.menuRepository.inserir(menu);
    }
}

export { MenuUseCase };