export interface SubjectPeriod {
    period: Period;
    subjects: Subject[];
}

export interface Period {
    statusId: number;
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    maxNumOfParticipants: number;
}

export interface Subject {
    statusId: number;
    id: number;
    name: string;
    description: string;
    acronym: string;
    code: string;
    numOfCredits: number;
    numOfHours: number;
    numOfClasses: number;
    hasLaboratory: boolean;
    evaluationCriteria: string;
    degreeCurriculumDesigns: any[];
    periods: any[];
    parentSubjects: any[];
    dependentSubjects: any[];
}
