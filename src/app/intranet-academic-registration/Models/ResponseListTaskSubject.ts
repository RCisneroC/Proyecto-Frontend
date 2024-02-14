
export interface ApiResponseInternalData {
    statusCode: number;
    success: boolean;
    message: string;
    data: DataTaskSubject[];
}
export interface DataTaskSubject {
    id: number;
    createdDate: Date;
    createdBy: string;
    lastModifiedDate: string;
    lastModifiedBy: string;
    totalRecords: number;
    taskFiles: TaskFile[];
    taskType: TaskType;
    subject: Subject;
    title: string;
    description: string;
    finalDate: Date;
    taskTypeId: number;
    subjectId: number;
    observation: string;
}

export interface Subject {
    id: number;
    name: string;
}

export interface TaskFile {
    name: string;
    fileType: string;
    content: string;
    subjectTaskId: number;
    activityTaskId: number;
}

export interface TaskType {
    name: string;
    id: number;
}
