export interface ResponseSubjectRecord {
    statusCode: number;
    success: boolean;
    message: string;
    data: CalificacionesModels[];
    errors: string;
}

export interface CalificacionesModels {
    id: number;
    createdDate: Date;
    createdBy: string;
    lastModifiedDate: string;
    lastModifiedBy: string;
    totalRecords: number;
    scoreType: ScoreType;
    academicSubjectRecords: AcademicSubjectRecords;
    subjectTask: SubjectTask;
    academicSubjectRecordId: number;
    score: number;
    scoreTypeId: number;
    subjectTaskId: number;
}

export interface AcademicSubjectRecords {
    id: number;
    academicRecord: string;
    efAcademicRecordId: number;
    subjectId: number;
}

export interface ScoreType {
    id: number;
    name: string;
}

export interface SubjectTask {
    title: string;
    subjectId: number;
    taskType: string;
    description: string;
}