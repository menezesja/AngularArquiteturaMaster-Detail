import { InMemoryDbService } from "angular-in-memory-web-api";
import { Category } from "./pages/categories";

export class InMemoryDatabase implements InMemoryDbService{
    createDb(){
        const categories: Category[] = [
            {id: 1, name: 'Moradia', description: 'Pagamento de Contas da Casa'},
            {id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios'}
        ];
        return { categories }
    }
}