export interface GraficasEC {
    activityStatisticsGroupedByModeId: ActivityStatisticsGroupedByModeID[];
    activityStatisticsGroupedByTypeId: ActivityStatisticsGroupedByTypeID[];
    activityStatisticsGroupedByLocationId: ActivityStatisticsGroupedByLocationID[];
    activityStatisticsGroupedByReasonId: ActivityStatisticsGroupedByReasonID[];
    activityStatisticsGroupedByFundsSourceId: ActivityStatisticsGroupedByFundsSourceID[];
    activityStatisticsGroupedByStatusId: ActivityStatisticsGroupedByStatusID[];
    activityStatisticsGroupedByCurriculumDesignId: ActivityStatisticsGroupedByCurriculumDesignID[];
}

export interface ActivityStatisticsGroupedByCurriculumDesignID {
    CurriculumDesignId: number;
    CurriculumDesignName: string;
    ActivityCount: number;
}

export interface ActivityStatisticsGroupedByFundsSourceID {
    ActivityFundsSourceId: number;
    ActivityFundsSourceName: string;
    ActivityCount: number;
}

export interface ActivityStatisticsGroupedByLocationID {
    ActivityLocationId: number;
    ActivityLocationName: string;
    ActivityCount: number;
}

export interface ActivityStatisticsGroupedByModeID {
    ActivityModeId: number;
    ActivityModeName: string;
    ActivityCount: number;
}

export interface ActivityStatisticsGroupedByReasonID {
    ActivityReasonId: number;
    ActivityReasonName: string;
    ActivityCount: number;
}

export interface ActivityStatisticsGroupedByStatusID {
    StatusId: number;
    StatusName: string;
    ActivityCount: number;
}

export interface ActivityStatisticsGroupedByTypeID {
    ActivityTypeId: number;
    ActivityTypeName: string;
    ActivityCount: number;
}