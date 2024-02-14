export interface documentosIncripcion {
    getDocResp: GetDocResp[];
    message: string;
    isError: boolean;
    statusCode: string;
}

export interface GetDocResp {
    documentId: number,
    docFile: string;
    fileType: string;
    validate: boolean;
    name?: string;
    inscriptionId: number;
}
