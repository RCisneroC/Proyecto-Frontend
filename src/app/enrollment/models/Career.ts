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
  degreeName: string,
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




