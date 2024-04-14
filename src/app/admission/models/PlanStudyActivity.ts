export interface PlanStudyActivity {
    statusId: number;
    id: number;
    activityId: number;
    name: string;
    description: string;
    courseOutline: CourseOutline | any;
}

export interface CourseOutline {
    fileContents: string;
    contentType: string;
    fileDownloadName: string;
    lastModified: string;
    entityTag: string;
    enableRangeProcessing: boolean;
}