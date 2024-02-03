export interface DetalleMalla {
    statusId: number;
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    degreeCurriculumDesignTarget: string;
    approvedBy: string;
    approvalDate: Date;
    approvalMessage: string;
    degree: Degree;
    periods: any[];
}

export interface Degree {
    statusId: number;
    id: number;
    name: string;
    description: string;
    graduationProfile: string;
    admissionProfile: string;
    generalGoals: string;
    durationInYears: number;
    numOfCredits: number;
    assignedCoordinatorId: string;
    assignedCoordinatorName: string;
    studyModeId: number;
    studyModeName: string;
}