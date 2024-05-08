export interface Categories {
  categorias: ListCategory[]
  message: string
  isError: boolean
  statusCode: number
}

export interface ListCategory {
  categoria_Id: number
  codigoCategoria: number
  descripcion: string
  statusId: number
  createdDate: string
  createBy: string
}
