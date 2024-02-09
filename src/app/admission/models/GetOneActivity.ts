import { Cooperating } from "./Cooperating";

export interface GetOneActivity {
    statusId: number;
    id: number;
    name: string;
    description: string;
    curriculumDesignId: number;
    curriculumDesignName: string;
    activityModeId: number;
    activityModeName: string;
    activityTypeId: number;
    activityTypeName: string;
    activityFundsSourceId: number;
    activityFundsSourceName: string;
    activityReasonId: number;
    activityReasonName: string;
    activityLocationId: number;
    activityLocationName: string;
    assignedCoordinatorId: string;
    assignedCoordinatorName: string;
    planningDate: Date;
    studentWithdrawalEndDate: Date;
    startDate: Date;
    plannedEndDate: Date;
    effectiveEndDate: Date;
    inscriptionStartDate: Date;
    inscriptionEndDate: Date;
    isExecuted: boolean;
    numOfAssignedTeachers: number;
    hasDataSheet: boolean;
    dataSheetDeliveryDate: Date;
    digitalReportDeliveryDate: Date;
    physicalReportDeliveryDate: Date;
    isEvaluation: boolean;
    observations: string;
    duration: number;
    totalHours: number;
    onSiteHours: number;
    synchronousHours: number;
    asynchronousHours: number;
    competencies: string;
    content: string;
    learningActivities: string;
    electronicEvaluation: boolean;
    enrolledStudentsDiploma: number;
    retiredStudentsDiploma: number;
    participants: number;
    male: number;
    female: number;
    certificatesReceived: number;
    studentQuota: number;
    participationProfile: number;
    activityTarget: number;
    hasCertificate: boolean;
    roomRequests: RoomRequest[];
    posterRequests: PosterRequest[];
    activityActivityRequirements: ActivityActivityRequirement[];
    activityTeachers: ActivityTeachers[];
    activityCooperatingOrganizations: ActivityCooperatingOrganization[];
}
export interface ActivityCooperatingOrganization {
    statusId: number;
    id: number;
    cooperatingOrganization: Cooperating;
}


export interface ActivityActivityRequirement {
    statusId: number;
    id: number;
    activityRequirement: ActivityRequirement;
}

export interface ActivityRequirement {
    statusId: number;
    id: number;
    name: string;
    description: string;
}

export interface PosterRequest {
    statusId: number;
    id: number;
    approvedBy: string;
    approvalDate: Date;
    approvalMessage: string;
    activityId: number;
    poster: Poster;
    activityName: string;
    posterType: number;
    posterComments: PosterComment[];
}

export interface Poster {
    fileContents: string;
    contentType: string;
    fileDownloadName: string;
    lastModified: string;
    entityTag: string;
    enableRangeProcessing: boolean;
}

export interface PosterComment {
    text: string;
    userId: string;
}

export interface RoomRequest {
    statusId: number;
    id: number;
    startDate: Date;
    endDate: Date;
    approvedBy: string;
    approvalDate: Date;
    approvalMessage: string;
    activityId: number;
    activityName: string;
    roomRequestRooms: RoomRequestRoom[];
    roomRequestRoomRequirements: RoomRequestRoomRequirement[];
}

export interface RoomRequestRoomRequirement {
    statusId: number;
    id: number;
    roomRequirement: ActivityRequirement;
}

export interface RoomRequestRoom {
    statusId: number;
    id: number;
    room: ActivityRequirement;
}

export interface ActivityTeachers {
    statusId: number;
    teacherCedula: string;
    teacherFullName: string;
}
