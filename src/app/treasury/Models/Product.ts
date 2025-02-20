export interface ProductRequest {
    getProducts: GetProduct[];
    message:        string;
    isError:        boolean;
    statusCode:     number;
}

export class Product {
    id:          number=-1;
    nMarbete: string="";
    name: string="";
    ubicacion: string="";
    cantidad: number=0;
    marca: string="";
    modelo: string="";
    serie: string="";
  }
  

export interface GetProduct {
    id:          number;
    name:        string;
    description?: string;
    actions?: string;
    statusId?:    number;
}