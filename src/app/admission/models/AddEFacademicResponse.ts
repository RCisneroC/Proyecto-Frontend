export interface ResponseAddEFcademicInfo {
  message: string;
  isError: boolean;
  statusCode: number;
  mssg: string;
}


export interface CreateEnrollmentResult {
  message: string;
  isError: boolean;
  statusCode: number;
  enrollmentResult: enrollmentResult[]
}


export interface enrollmentResult {
  ejInscriptionId: number,
  degreeId: number,
  status: number,
  createdBy: string,
  createdDate: Date,
  enrollmentId: number,
  studentId: number
}


export interface GetSubjectEnrollmentResult {
  message: string;
  isError: boolean;
  statusCode: number;
  subjectEnrollmentResult: subjectEnrollmentResult[]
}


export interface subjectEnrollmentResult {
  studentId: number,
  firstName: string,
  lastName: string,
  cedula: string,
  asignaturaId: 1,
  asignatura: string,
  codigo: string,
  descriptionSuject: string,
  periodsId: number,
  periodName: string,
  periodDescription: string,
  mallaId: number,
  mallaName: string,
  degreeId: number,
  nAmeDegree: string;
  teacherCedula: string;
  years: number;
}



export interface GetStudentsActivityResponse {
  message: string;
  isError: boolean;
  statusCode: number;
  getStudentsActivityResponse: getStudentsActivityResponse[]
}


export interface getStudentsActivityResponse {
  participantId: string,
  acivityId: number,
  cedula: string,
  firstName: string,
  lastName: string,
  gender: string,
  email: string,
  acitityName: string,
  duration: number,
  totalHours: number,
  activityModeName: string,
  activityTypeName: string,
  activityLocationName: string
  degreeCurriculumDesignId: number;
}

export interface  CreateCertificateResponse {
  certificate: {
    fileContents: string,
    contentType: string,
    fileDownloadName: string,
    enableRangeProcessing: boolean
  }
}
