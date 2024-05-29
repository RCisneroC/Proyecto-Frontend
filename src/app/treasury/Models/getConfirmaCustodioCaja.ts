export interface ResponseGetConfirmaCustodioCaja {
    getConfirmacionCustodio: GetConfirmacionCustodio[];
    message:                 string;
    isError:                 boolean;
    statusCode:              number;
}

export interface GetConfirmacionCustodio {
    solicitudCompraMenorId: number;
    categoriaId:            number;
    codigoFinanciero:       number;
    nameCategoria:          string;
    valor:                  number;
    statudId:               number;
    createdDate:            Date;
    createBy:               string;
    idCompra:number;
}
