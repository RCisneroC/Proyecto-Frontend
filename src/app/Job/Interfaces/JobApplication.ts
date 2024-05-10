export interface JobApplication {
    statusId: number;
    id: number;
    applicantFullName: string;
    applicantEmail: string;
    cv: CV;
    commentary: string;
    jobId: number;
    jobName: string;
}

export interface CV {
    fileContents: string;
    contentType: string;
    fileDownloadName: string;
    lastModified: string;
    entityTag: string;
    enableRangeProcessing: boolean;
}
