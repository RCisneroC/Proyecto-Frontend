export class ScheduleActivity {
    id!: number;
    name!: string;
    description!:string;
    year!:number;
    curriculumDesignStatusId!: number;
 }
 
 export class ScheduleActivityDetail {
   curriculumDesignId!:string
   idDetail!:string
   planningDate!: string
   activityModeId!: number
   activityTypeId!: number
   activityNameId!: number
   activityLocationId!: number
   assignedCoordinatorId!: number
   startDate!: string
   plannedEndDate!: string
   effectiveEndDate!: string
   isExecuted!: boolean
   activityReasonId!: number
   activityFundsSourceId!: number
   numOfAssignedTeachers!: number
   hasDataSheet!: boolean
   dataSheetDeliveryDate!: string
   isEvaluation!: boolean
   digitalReportDeliveryDate!: string
   physicalReportDeliveryDate!: string
   enrolledStudentsDiplomat!: number
   retiredStudentsDiplomat!: number
   participants!: number
   male!: number
   female!: number
   certificatesReceived!: number
   observations!: string
 }
 
 