
export interface AcceptanceRequestResponse {
  message: string
  isError: boolean
  statusCode: number
  getsolicitudAprobacions: AcceptanceRequest[]
}

export interface AcceptanceRequest {
  requestId: number,
  solicitudSatatusId: number,
  createdSolicitud: Date,
  createdBy: string,
  acceptedBy: string,
  dateAcceptance: Date,
  statusId: number
}

