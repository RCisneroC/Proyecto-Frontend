export interface AddPurchaseRequest {
  solicituCompraMenorId: number
  creartedBy: string
  confirmaCompras: ConfirmaCompra[]
  cedula: string
}

export interface ConfirmaCompra {
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
}
