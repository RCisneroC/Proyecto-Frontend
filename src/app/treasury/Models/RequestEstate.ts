
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
  requesterNumber: number
  daA_Number: string
  revisionDate: Date,
  revisionNumber: number
  goodsOrService: boolean
  service: boolean
  works: boolean
  requesterSignature: boolean
  approvalSignature: boolean
  createdDate: Date
  createdBy: string
  statusId: number
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
