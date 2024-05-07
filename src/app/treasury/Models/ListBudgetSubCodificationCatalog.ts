export interface ListBudgetSubCodificationCatalog {
  message: string
  isError: boolean
  statusCode: number
  subcategorias: Subcategoria[]
}

export interface Subcategoria {
  subCategoriaId?: number
  codigoSubcategoria?: number
  descripcion?: string
  categoriaId?: number
  statusId?: number
  createdDate?: string
  createBy?: string
  actions?: string
}
