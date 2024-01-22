export interface documentosIncripcion {
    getDocResp: GetDocResp[];
    message:    string;
    isError:    boolean;
    statusCode: string;
}

export interface GetDocResp {
    docFile:  string;
    fileType: string;
}
