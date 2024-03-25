export interface EstadisticasModelParticipante {
  dataResponseEC: EstadisticasModelParticipanteResponse[]
  message: string,
  isError: boolean,
  statusCode: number
}



export interface EstadisticasModelParticipanteResponse {
  participantId: string,
  firstName: string,
  lastName: string,
  provincia: string,
  cedula: string,
  gender: string,
  activityId: number,
  curso: string,
  year: number,
  distrito: string,
  universidad: string,
  institución: string,
  dependencia: string,
  entidad_Cooperante: string,
  codigo_dependencia: string,
  posición: string,
  degreeCurriculumDesignId: number
}

