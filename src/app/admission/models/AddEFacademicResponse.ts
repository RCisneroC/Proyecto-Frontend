export interface ResponseAddEFcademicInfo{
  message:      string;
  isError:      boolean;
  statusCode:   number;
  mssg:         string;
}


export interface CreateEnrollmentResult{
  message:      string;
  isError:      boolean;
  statusCode:   number;
  enrollmentResult: enrollmentResult[]
}


export interface enrollmentResult{
  ejInscriptionId: number,
  degreeId: number,
  status:number,
  createdBy: string,
  createdDate: Date,
  enrollmentId: number,
  studentId: number
}
