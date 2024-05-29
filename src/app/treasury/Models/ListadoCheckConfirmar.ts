export interface ListadoCheckConfirmar {
    dataPDFReembolsos:  DataPDFReembolsosConfirmar;
    _ResultadoConsulta: ResultadoConsultaConfirmar[];
    message:            string;
    isError:            boolean;
    statusCode:         null;
}

export interface ResultadoConsultaConfirmar {
    unidadSolicitante:      string;
    fechaCreacion:          Date;
    proveedor:              string;
    concepto:               string;
    categoriaId:            number;
    codigoFinaciero:        number;
    valor:                  number;
    statusIdConfirma:       number;
    statusIdCompraMenor:    number;
    solicitudCompraMenorId: number;
    confirmId:              number;
    codigoPresupuesto:      number;
}

export interface DataPDFReembolsosConfirmar {
    docFile:  null;
    fileType: string;
}
