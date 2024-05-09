export interface GetTicketResponse {
  message: string
  isError: boolean
  statusCode: number
  getBoletas: Tickets[]
}

export interface Tickets {
  boletaId: number
  numeroBoleta: number
  descripcion: string
  monto: number
  file: string
  createdBy: string
  statusId: number
  docFile: string
  fileType: string
}
