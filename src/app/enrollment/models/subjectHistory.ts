export interface subjectHistory {
  subjectEnrollmentResult: SubjectEnrollmentResult[]
  message: string
  isError: boolean
  statusCode: number
}

export interface SubjectEnrollmentResult {
  studentId: number
  firstName: string
  lastName: string
  cedula: string
  asignaturaId: number
  asignatura: string
  codigo: string
  descriptionSuject: string
  periodsId: number
  periodName: string
  periodDescription: string
  mallaId: number
  mallaName: string
  degreeId: number
  nAmeDegree: string
  years: number
  subjectStatusId: number
  teacherCedula: any
}
