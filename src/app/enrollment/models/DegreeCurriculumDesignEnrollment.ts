export interface DegreeCurriculumDesignEnrollment {
  statusId: number;
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  degreeCurriculumDesignTarget?: any;
  approvedBy: string;
  approvalDate: string;
  approvalMessage: string;
  degree?: any;
  periods: any[];
  action: string;
}
