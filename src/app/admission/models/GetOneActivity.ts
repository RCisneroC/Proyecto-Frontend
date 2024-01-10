export interface GetActivity {
    statusId:                     number;
    id:                           number;
    name:                         string;
    description:                  string;
    curriculumDesignId:           number;
    curriculumDesignName:         string;
    activityModeId:               number;
    activityModeName:             string;
    activityTypeId:               number;
    activityTypeName:             string;
    activityFundsSourceId:        number;
    activityFundsSourceName:      string;
    activityReasonId:             number;
    activityReasonName:           string;
    activityLocationId:           number;
    activityLocationName:         string;
    assignedCoordinatorId:        string;
    assignedCoordinatorName:      string;
    planningDate:                 Date;
    startDate:                    Date;
    plannedEndDate:               Date;
    effectiveEndDate:             Date;
    isExecuted:                   boolean;
    numOfAssignedTeachers:        number;
    hasDataSheet:                 boolean;
    dataSheetDeliveryDate:        Date;
    digitalReportDeliveryDate:    Date;
    physicalReportDeliveryDate:   Date;
    isEvaluation:                 boolean;
    observations:                 string;
    enrolledStudentsDiploma:      number;
    retiredStudentsDiploma:       number;
    participants:                 number;
    male:                         number;
    female:                       number;
    certificatesReceived:         number;
    roomRequests:                 RoomRequest[];
    posterRequests:               PosterRequest[];
    activityActivityRequirements: ActivityActivityRequirement[];
}

export interface ActivityActivityRequirement {
    statusId:            number;
    id:                  number;
    activityRequirement: ActivityRequirement;
}

export interface ActivityRequirement {
    statusId:    number;
    id:          number;
    name:        string;
    description: string;
}

export interface PosterRequest {
    statusId:        number;
    id:              number;
    approvedBy:      string;
    approvalDate:    Date;
    approvalMessage: string;
    activityId:      number;
    poster:          Poster;
    posterComments:  any[];
}

export interface Poster {
    fileContents:          string;
    contentType:           string;
    fileDownloadName:      string;
    lastModified:          string;
    entityTag:             string;
    enableRangeProcessing: boolean;
}

export interface RoomRequest {
    statusId:                    number;
    id:                          number;
    startDate:                   Date;
    endDate:                     Date;
    approvedBy:                  string | string;
    approvalDate:                Date | null;
    approvalMessage:             string | string;
    activityId:                  number;
    roomRequestRooms:            RoomRequestRoom[];
    roomRequestRoomRequirements: RoomRequestRoomRequirement[];
}

export interface RoomRequestRoomRequirement {
    statusId:        number;
    id:              number;
    roomRequirement: ActivityRequirement;
}

export interface RoomRequestRoom {
    statusId: number;
    id:       number;
    room:     ActivityRequirement;
}
