export interface LogoCooperting {
    statusId:    number;
    id:          number;
    name:        string;
    logo:        Logo;
    description: string;
}

export interface Logo {
    fileContents:          string;
    contentType:           string;
    fileDownloadName:      string;
    lastModified:          string;
    entityTag:             string;
    enableRangeProcessing: boolean;
}
