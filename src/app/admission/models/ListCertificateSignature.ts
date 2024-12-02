export interface CertificateSignature {
    id: number;
    signatureId: string;
    name: string;
    email: string;
    description: string;
    urlToSign: string;
    status: number;
    isDocumentSigned: boolean;
    createdOn: string;
    updateOn: string;
}

export interface ListCertificateSignatureResponse {
    data: CertificateSignature[];
    message: string;
    isError: boolean;
    statusCode: number;
}