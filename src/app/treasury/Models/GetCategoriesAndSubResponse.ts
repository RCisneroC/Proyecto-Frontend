export interface GetCategoriesAndSubResponse {
  message: string
  isError: boolean
  statusCode: number
  categoriasResult: CategoriasResult[]
}

export interface CategoriasResult {
  categoriaId: number
  codigoCategoria: number
  descripcion: string
  subcategorias: Subcategoria[]
}

export interface Subcategoria {
  subCategoriaId: number
  codigoSubcategoria: number
  descripcion: string
  categoriaId: number
}
