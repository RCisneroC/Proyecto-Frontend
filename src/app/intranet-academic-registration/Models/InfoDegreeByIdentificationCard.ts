export interface InfoDegreeByIdentificationCard {
  statusCode: number
  success: boolean
  message: any
  data: Daum[]
  errors: any
}

export interface Daum {
  degree: Degree
  efAcademicRecord: number
  totalRecords: number
}

export interface Degree {
  id: number
  name: string
  description: string
  startDate: string
  endDate: string
  degreeId: number
  createdDate: string
  createdBy?: string
  lastModifiedDate: string
  lastModifiedBy: string
  statusId: number
  degreeCurriculumDesignTarget?: number
  approvalDate: string
  approvalMessage: string
  approvedBy: string
  degree: any
  status: any
  annualPlanDegreeCurriculumDesigns: any[]
  degreeCurriculumDesignSubjects: any[]
  periods: any[]
}
