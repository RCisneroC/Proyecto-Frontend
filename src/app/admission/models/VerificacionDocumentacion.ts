export interface VerificarDocumentacion {
    message:              string;
    validateFileResponse: ValidateFileResponse[];
    isError:              boolean;
    statusCode:           number;
}

export interface ValidateFileResponse {
    mss:  string;
    id:   number;
    name: string;
}
