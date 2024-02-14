export interface ResponseListActivity {
    statusCode: number;
    success: boolean;
    message: string;
    data: TaskActivityData[];
    errors: string;
}

export interface TaskActivityData {
    id: number;
    createdDate: Date;
    createdBy: string;
    lastModifiedDate: string;
    lastModifiedBy: string;
    totalRecords: number;
    taskFiles: TaskFileActivity[];
    taskType: TaskTypeActivity;
    activity: Activity;
    title: string;
    finalDate: Date;
    taskTypeId: number;
    description: string;
    observation: string;
    activityId: number;
}

export interface Activity {
    id: number;
    name: string;
}

export interface TaskFileActivity {
    name: string;
    fileType: string;
    content: string;
    subjectTaskId: number;
    activityTaskId: number;
}

export interface TaskTypeActivity {
    name: string;
    id: number;
}