export interface CurriculumDesign {
  statusId: number;
  id: number;
  name: string;
  description: string;
  year: number;
  approvedBy: string;
  approvalDate: string;
  activities: Activity[];
}

interface Activity {
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
  planningDate: string;
  startDate: string;
  plannedEndDate: string;
  effectiveEndDate: string;
  startTime?: any;
  endTime?: any;
  inscriptionStartDate: string;
  inscriptionEndDate: string;
  studentWithdrawalEndDate: string;
  dataSheetDeliveryDate: string;
  digitalReportDeliveryDate: string;
  physicalReportDeliveryDate: string;
  isExecuted: boolean;
  hasDataSheet: boolean;
  hasCertificate: boolean;
  hasSurvey?: any;
  isEvaluation: boolean;
  observations: string;
  duration?: any;
  totalHours?: any;
  onSiteHours?: any;
  synchronousHours?: any;
  asynchronousHours?: any;
  competencies?: any;
  content?: any;
  learningActivities?: any;
  electronicEvaluation?: any;
  participationProfile: number;
  activityTarget: number;
  virtualRoom: string;
  meetLink?: any;
  justification?: any;
  generalGoals?: any;
  specificGoals?: any;
  participantAdmissionProfile?: any;
  participantGraduateProfile?: any;
  teachingMethodology?: any;
  evaluation?: any;
  bibliographicCitation?: any;
  moodleCourseId: number;
  activityTrainingType: number;
  hasDirectEnrollment: boolean;
  numOfAssignedTeachers: number;
  enrolledStudentsDiploma: number;
  retiredStudentsDiploma: number;
  participants: number;
  male: number;
  female: number;
  certificatesReceived: number;
  roomRequests: any[];
  posterRequests: any[];
  activityActivityRequirements: ActivityActivityRequirement[];
  activityTeachers: ActivityTeacher[];
  activityCooperatingOrganizations: any[];
}
interface ActivityTeacher {
  statusId: number;
  teacherCedula: string;
  teacherFullName?: any;
}
interface ActivityActivityRequirement {
  statusId: number;
  id: number;
  activityRequirement: ActivityRequirement;
}
interface ActivityRequirement {
  statusId: number;
  id: number;
  name: string;
  description: string;
}
