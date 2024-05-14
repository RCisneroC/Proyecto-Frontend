
export interface RequestEstateListResponse {
  message: string
  isError: boolean
  statusCode: number
  dataResult: RequestEstateList[]
}

export interface RequestEstateList {
  requestId: number
  unitId: string
  telephone: string
  numeroUsoSolicitante: number
  daa_Number: string
  descripcion: string
  revisionDate: Date
  numeroRevision: number
  bienes: boolean
  service: boolean
  obras: boolean
  nombreSolicitante: string
  firmaSolicitante: boolean
  firmaAprobacion: boolean
  codigoId: number
  createdDate: Date
  createdBy: string
  modifiedBy: string
  statusId: number
  periodoContableId: number
  detailRequests: RequestEstateDetail[]
}


export interface RequestEstateDetail {
  detailId: number
  requestForGoodsAndServicesId: number
  lineNumber: number
  quantity: number
  unit: string
  code: number
  price: number
  quantityToSupply: number
  goodsOrServiceDetail: string
}
