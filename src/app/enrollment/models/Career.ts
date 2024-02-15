export interface Career {
  aspirantId: number,
  ejInscriptionId: number,
  createDate: string,
  firstName: string,
  lastName: string,
  degreeCurriculumDesignId: number,
  mCurriculumName: string,
  descriptionName: string,
  degreeId: number,
  cedula: string,
  telephoneNumber: string,
  email: string,
  statusDegreeCurriculumDesign: number,
  annualPlanId: number,
  startDate: Date,
  endDate: Date,
  degreeCurriculumDesignTarget: number
}



export interface CareerResponse {
  studentInnfo: Career[],
  message: string,
  isError: boolean,
  statusCode: number
}



export interface SearchAcademicSubjectAttendanceRecord{
  statusCode: number,
  success: boolean,
  message: string,
  data: AttenderResponse[],
  errors: string
}


export interface AttenderResponse {
  id: 11,
  createdDate: Date,
  createdBy: string,
  lastModifiedDate: Date,
  lastModifiedBy: string,
  totalRecords: number,
  academicSubjectRecordId: number,
  date: Date,
  attended: boolean
}




