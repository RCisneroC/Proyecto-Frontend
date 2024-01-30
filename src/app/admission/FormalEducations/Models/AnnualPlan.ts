export interface AnnualPlan {
  statusId: number;
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  approvedBy: string;
  approvalDate: Date;
  approvalMessage: string;
  annualPlanDegreeCurriculumDesigns: AnnualPlanDegreeCurriculumDesign[];
  periods: Period[];
}

export interface AnnualPlanDegreeCurriculumDesign {
  statusId: number;
  id: number;
  inscriptionStartDate: Date;
  inscriptionEndDate: Date;
  degreeCurriculumDesign: DegreeCurriculumDesign;
}

export interface DegreeCurriculumDesign {
  statusId: number;
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  degreeCurriculumDesignTarget: number;
}

export interface Period {
  statusId: number;
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  maxNumOfParticipants: number;
}
