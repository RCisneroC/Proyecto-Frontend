export class ScheduleActivity {
  id!: number;
  name!: string;
  description!: string;
  year!: number;
  statusId!: number;
  moodleCourseId!: number;
  curriculumDesignActivities!: ScheduleActivityDetail[];
}

export class ScheduleActivityDetail {
  curriculumDesignId!: number;
  id!: number;
  planningDate!: string;
  activityModeId!: number;
  activityTypeId!: number;
  name!: string;
  activityLocationId!: number;
  assignedCoordinatorId!: string;
  startDate!: string;
  plannedEndDate!: string;
  effectiveEndDate!: string;
  isExecuted!: boolean;
  activityReasonId!: number;
  activityFundsSourceId!: number;
  numOfAssignedTeachers!: number;
  hasDataSheet!: boolean;
  dataSheetDeliveryDate!: string;
  isEvaluation!: boolean;
  digitalReportDeliveryDate!: string;
  physicalReportDeliveryDate!: string;
  enrolledStudentsDiplomat!: number;
  retiredStudentsDiplomat!: number;
  participants!: number;
  male!: number;
  female!: number;
  certificatesReceived!: number;
  observations!: string;
  inscriptionStartDate!: string;
  inscriptionEndDate!: string;
  activityTrainingType!: number;
  activityClass!: number;
  statusId!: number;
  hasDirectEnrollment!: boolean;
  moodleCourseId!: number;
}

