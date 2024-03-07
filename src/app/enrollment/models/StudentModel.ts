export interface StudentModel {
  verifyUsersResult: VerifyUsersResult[]
  message: string
  isError: boolean
  statusCode: number
}

export interface VerifyUsersResult {
  firstName: string
  lastName: string
  secondsurname: string
  cedula: string
  email: string
  gender: string
  aspirant: Aspirant[]
  participant: Participant[]
  asp: boolean
  part: boolean
}

export interface Aspirant {
  firstName: string
  lastName: string
  secondsurname: string
  cedula: string
  email: string
  gender: string
  dateOfBirth: string
  placeOfBirth: string
  residentialAddress: string
  telephoneNumber: string
  homePhoneNumber: any
  bloodtype: string
  maritalStatus: string
  nameOfspouse: string
  numberofchildren: string
  caseOfemergency: string
  telephoneNumberEmergency: string
  specialCapacity: boolean
  visual: boolean
  auditory: boolean
  cognitive: boolean
  physical: boolean
  specific: string
  others: string
  usesAwheelchair: boolean
}

export interface Participant {
  firstName: string
  lastName: string
  secondsurname: string
  cedula: string
  email: string
  gender: string
  institution: string
  university: string
  dependency: string
  cooperatingEntity: string
  position: string
  province: string
  judicialDistrict: string
  invitationDate: string
}
