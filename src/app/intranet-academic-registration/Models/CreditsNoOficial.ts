export interface CreditsNoOficial {
  statusCode: number
  success: boolean
  message: any
  data: Data
  errors: any
}

export interface Data {
  requestVariousId: number
  contentInHtml: string
  pdfContentInBase64: string
}
