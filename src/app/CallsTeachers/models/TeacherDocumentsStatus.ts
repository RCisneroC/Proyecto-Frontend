export interface TeacherDocumentsStatus{
  teacherId: number
  cedula: string
  name: string
  lastName: string
  email: string
  applicationDate: string
  selected: boolean
  dischargeDate: string
  placeResidence: string
  gender: string
  dateOfBirth: string
  placeOfBirth: string
  phoneNumber: string
  type: string
  id: number
  statusId: number
  evaluation?: number
  commentEvaluation?: string
  contractType: string
  comment: any
  listCourse: any
  listTraining: any
  listSpecialty: any
  listExperience: any
  listDocument: any
  listActivity: any
  listSubject: any
  process: number
  createdDate: string
  createdBy: string
  lastModifiedDate: string
  lastModifiedBy: string
}

