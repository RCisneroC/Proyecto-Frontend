

export interface BudgetCoding {
   // id: number;
    categoria_Id: number;
    //name: string;
    descripcion: string;
    //code: string;
    createdBy: string;
    createdDate: string; 
    statusId: number;
    modifiedBy:string;
    codigoCategoria:number;
    getCatalogoIngresos: CatalogoIngreso[];

  }
  
  interface CatalogoIngreso {
    id: number;
    name: string;
    description: string;
    code: string;
    createdBy: string;
    createdDate: string; // Assuming format is kept as a string
    statusId: number;
  }
  
  interface Response {
    message: string;
    isError: boolean;
    statusCode: number;
    getCatalogoIngresos: CatalogoIngreso[];
  }
  