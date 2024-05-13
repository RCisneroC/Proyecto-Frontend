export interface PDFComprobandeCajaMenudaResponse {
  message: string
  isError: boolean
  statusCode: number
  responseComprobanteCajaMenudas: ResponseComprobanteCajaMenudas
}

export interface ResponseComprobanteCajaMenudas {
  docFile: string
  fileType: string
}
