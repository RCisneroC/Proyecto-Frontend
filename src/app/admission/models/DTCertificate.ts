export interface DTCertificate {
    certificateTemplate: CertificateTemplate;
}

export interface CertificateTemplate {
    fileContents: string;
    contentType: string;
    fileDownloadName: string;
    lastModified: null;
    entityTag: null;
    enableRangeProcessing: boolean;
}
