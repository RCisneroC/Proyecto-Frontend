import { Time } from "@angular/common";
import { Cooperating } from "./Cooperating";

export interface GetOneActivity {
    id: number;
    statusId: number;
    name: string;
    description: string;
    curriculumDesignId: number;
    curriculumDesignName: string;
    activityModeId: number;
    activityModeName: string;
    activityTypeId: number;
    activityTypeName: string;
    activityLocationId: number;
    activityLocationName: string;
    activityFundsSourceId: number;
    activityFundsSourceName: string;
    activityReasonId: number;
    activityReasonName: string;
    assignedCoordinatorId: string;
    assignedCoordinatorName: string;
    studentQuota: number;
    planningDate: Date;
    startDate: Date;
    plannedEndDate: Date;
    effectiveEndDate: Date;
    startTime: Date;
    endTime: Date;
    inscriptionStartDate: Date;
    inscriptionEndDate: Date;
    studentWithdrawalEndDate: Date;
    dataSheetDeliveryDate: Date;
    digitalReportDeliveryDate: Date;
    physicalReportDeliveryDate: Date;
    isExecuted: boolean;
    hasDataSheet: boolean;
    hasCertificate: boolean;
    hasSurvey: boolean;
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
    participationProfile: number;
    activityTarget: number;
    virtualRoom: string;
    meetLink: string;
    justification: string;
    generalGoals: string;
    specificGoals: string;
    participantAdmissionProfile: string;
    participantGraduateProfile: string;
    teachingMethodology: string;
    enrolledStudentsDiploma: number;
    retiredStudentsDiploma: number;
    participants: number;
    male: number;
    female: number;
    certificatesReceived: number;
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
