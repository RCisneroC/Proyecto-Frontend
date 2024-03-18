export interface EstadisticasModelMatricula {
  dataResponse: EstadisticasModelMatriculaResponse[]
  message: string,
  isError: boolean,
  statusCode: number
}



export interface EstadisticasModelMatriculaResponse {
  studentId: number,
  firstName: string,
  lastName: string,
  provincia: string,
  cedula: string,
  dateOfBirth: number,
  edad: number,
  periodsId: number,
  periodName: string,
  periodDescription: string,
  mallaId: number,
  mallaName: string,
  degreeId: number,
  degreeName: string,
  gender: string,
  year: number,
  discapacidad: boolean
}
