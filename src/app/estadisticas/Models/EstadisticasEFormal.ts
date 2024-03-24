
export interface EstadisticasEFormal {
    name: string;
    degreeCountByName: number;
    degreesByName: any[];
    durationInYears: string;
    degreeCountByDurationInYears: number;
    degreesByDurationInYears: any[];
    numOfCredits: string;
    degreeCountByNumOfCredits: number;
    degreesByNumOfCredits: any[];
    assignedCoordinatorId: string;
    degreeCountByAssignedCoordinatorId: number;
    degreesByAssignedCoordinatorId: any[];
    studyModeId: string;
    studyModeName: string;
    degreeCountByStudyModeId: number;
    degreesByStudyModeId: any[];
    degreesByAll: DegreesByAll[];
}

export interface DegreesByAll {
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
    degreeCompetences: any[];
    degreeDegreeAdmissionRequirements: any[];
    degreeCurriculumDesigns: any[];
    posterRequests: any[];
}
