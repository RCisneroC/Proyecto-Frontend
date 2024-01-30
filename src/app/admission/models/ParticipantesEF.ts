export interface ListInscriptionResponse {
    inscriptionResponse: InscriptionResponse[];
    message: string;
    isError: boolean;
    statusCode: number;
}

export interface InscriptionResponse {
    inscriptionId: number;
    firstName: string;
    lastName: string;
    cedula: string;
    dateOfBirth: Date;
    placeOfBirth: string;
    residentialAddress: string;
    telephoneNumber: string;
    email: string;
    degreeId: number;
    status: string;
}
