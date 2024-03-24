import { ApiResponseInternal } from "app/intranet-academic-registration/Models/TypeTask";

export interface ActivityDetailModules {
    statusId: number;
    id: number;
    activityStudyPlanId: number;
    name: string;
    description: string;
    synchronousHours: number;
    asynchronousHours: number;
    inPersonHours: number;
    totalHours: number;
    percentageValue: number;
    learningGoals: string;
    competencies: string;
    subTopics: string;
    methodologicalStrategy: string;
    bibliographicCitation: string;
    teachingResources: string,
    evaluation: string,
    learningStrategies: string;
    createdDate: Date;
    activityStudyPlanModuleLearningActivities: ActivityStudyPlanModuleLearningActivity[];
}

export interface ActivityStudyPlanModuleLearningActivity {
    statusId: number;
    id: number;
    activityStudyPlanModuleId: number;
    name: string;
    description: string;
    
    IdTask?: number; 
    Title?: string;
    FinalDate?: Date;
    TaskTypeId?: number; 
    DescriptionTask?: string;
    PeriodYearSubjectRoomId?: number; 
    Observation?: string;
    TypeTask?: ApiResponseInternal;
}