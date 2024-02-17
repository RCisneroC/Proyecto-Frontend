export interface ResponseActivityRecord {
    statusCode: number;
    success: boolean;
    message: string;
    data: CalificacionesECModels[];
    errors: string;
}

export interface CalificacionesECModels {
    id: number;
    createdDate: Date;
    createdBy: string;
    lastModifiedDate: string;
    lastModifiedBy: string;
    totalRecords: number;
    scoreType: ScoreTypeEC;
    activityTask: ActivityTask;
    ecAcademicRecordId: number;
    score: number;
    scoreTypeId: number;
    activityTaskId: number;
}


export interface ScoreTypeEC {
    name: string;
    isActive: boolean;
    id: number;
    createdDate: Date;
    createdBy: string;
    lastModifiedDate: Date;
    lastModifiedBy: string
}

export interface ActivityTask {
    title: string;
    finalDate: Date;
    taskTypeId: string;
    description: string;
    observation:string;
    activityId: number;
    id: number;
    createdDate:Date;
    createdBy: string;
    lastModifiedDate: Date;
    lastModifiedBy: string;
}
