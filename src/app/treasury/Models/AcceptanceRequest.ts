
export interface AcceptanceRequestResponse {
  message: string
  isError: boolean
  statusCode: number
  getsolicitudAprobacions: AcceptanceRequest[]
}

export interface AcceptanceRequest {
  detalleId: number,
  solicitudId: number
  firmaSolicitante: boolean
  firmaAprobacion: boolean
  createdDate: Date
  createdBy: string
  statusId: number
}

