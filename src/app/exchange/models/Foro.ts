export interface ForoResponse {
  getForos: Foro[],
  message: string,
  isError: boolean,
  statusCode: number
}

export interface Foro {
  foroId: number,
  title: string,
  description: string,
  createdDate: Date,
  createdBy: string,
  statusId: number,
  categoriesId: number,
  categoriesName: string
}
