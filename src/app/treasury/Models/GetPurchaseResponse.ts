export interface GetPurchaseResponse {
  message: string
  isError: boolean
  statusCode: number
  getConfirmaCompraResponses: GetConfirmaCompraResponse[]
}

export interface GetConfirmaCompraResponse {
  solicituCompraMenorId: number
  adelanto: number
  importeFactura: number
  ajuste: number
  proveedor: string
  numFactura: number
  categoriaId: number
  codigoFinaciero: number
  valor: number
  firmaAnallistaPresupestaria: boolean
  autorizadoPor: string
  entregadoPor: string
  nombreRecibe: string
  firma: boolean
  cedula: string
  docFile: string
  createdBy: string
  createdDate: string
  statusId: number
}
