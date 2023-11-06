import { BaseResourceModel } from "src/app/shared";

export class Category extends BaseResourceModel{
    constructor(
        public override id?: number,
        public name?: string,
        public description?: string
    ){ 
        super();
    }
}