import { RequirementAdmision } from "./RequirementAdmision";

export interface Degree{
    id: number;
    statusId: number;
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
    degreeDegreeAdmissionRequirements: DegreeDegreeAdmissionRequirement[];
    degreeCompetences: DegreeDegreeCompetence[];
    degreeCurriculumDesigns: DegreeCurriculumDesign[];
    posterRequests: PosterRequest[];
}

export interface DegreeCurriculumDesign {
    statusId:                     number;
    id:                           number;
    name:                         string;
    description:                  string;
    startDate:                    Date;
    endDate:                      Date;
    degreeCurriculumDesignTarget: number;
}

export interface DegreeDegreeAdmissionRequirement {
    statusId:                   number;
    id:                         number;
    degreeAdmissionRequirement: RequirementAdmision;
}

export interface DetalleDegree {
    statusId:    number;
    id:          number;
    name:        string;
    description: string;
}

export interface DegreeDegreeCompetence {
    statusId:    number;
    id:          number;
    degreeId:    number;
    degreeName:  string;
    name:        string;
    description: string;
}

export interface PosterRequest {
    statusId:        number;
    id:              number;
    approvedBy:      string;
    approvalDate:    Date | string;
    approvalMessage: string;
    degreeId:        number;
    degreeName:      string;
    poster:          Poster;
    posterType:      number;
    posterComments:  PosterComment[];
}

export interface Poster {
    fileContents:          string;
    contentType:           string;
    fileDownloadName:      string;
    lastModified:          string;
    entityTag:             string;
    enableRangeProcessing: boolean;
}

export interface PosterComment {
    text:   string;
    userId: string;
}


export interface CreateCurriculumDesign {
    statusId:                     number;
    id:                           number;
    name:                         string;
    description:                  string;
    startDate:                    Date;
    endDate:                      Date;
    degreeCurriculumDesignTarget: number;
}
