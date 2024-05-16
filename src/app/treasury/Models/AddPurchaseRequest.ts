export interface AddPurchaseRequest {
  solicituCompraMenorId: number
  creartedBy: string
  confirmaCompras: ConfirmaCompra[]
  cedula: string
  firmaAnallistaPresupestaria: boolean
  autorizadoPor: string
  entregadoPor: string
  nombreRecibe: string
  firma: boolean
}

export interface ConfirmaCompra {
  categoriaId: number
  codigoFinaciero: number
  valor: number
}
