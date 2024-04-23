export interface CompanyJobs {
    statusId: number;
    id: number;
    name: string;
    logo: string;
    description: string;
    email: string;
    phone: string;
    contactPersonFullName: string;
}


export interface LogoCompany {
    statusId: number;
    id: number;
    name: string;
    logo: LogoCompanyDetails;
    description: string;
}

export interface LogoCompanyDetails {
    fileContents: string;
    contentType: string;
    fileDownloadName: string;
    lastModified: string;
    entityTag: string;
    enableRangeProcessing: boolean;
}
