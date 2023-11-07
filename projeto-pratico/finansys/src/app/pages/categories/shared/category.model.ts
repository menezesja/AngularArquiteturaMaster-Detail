import { BaseResourceModel } from "src/app/shared";

export class Category extends BaseResourceModel{
    constructor(
        override id?:number,
        public name?: string,
        public description?: string
    ){
        super();
    }

    static fromJson(jsonData: any): Category {
        return Object.assign(new Category(), jsonData);
    }
}