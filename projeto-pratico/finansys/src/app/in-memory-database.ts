import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDatabase implements InMemoryDbService{
    createDb(){
        const categories = [
            {id: 1, name: 'Moradia', decription: 'Pagamento de Contas da Casa'},
            {id: 2, name: 'Saúde', decription: 'Plano de Saúde e Remédios'}
        ];
        return { categories }
    }
}