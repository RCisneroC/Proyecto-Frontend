export interface GetAprobacionResponse {
  message: string
  isError: boolean
  statusCode: number
  responseCompraMenor: ResponseCompraMenor[]
}

export interface ResponseCompraMenor {
  compraMenorId?: number
  unidadSolicitante?: string
  entregueseA?: string
  sumaDe?: number
  conceptoDe?: string
  createDate?: string
  createdBy?: string
  statusId?: number
  actions?: string
  detalleId?: number
}
