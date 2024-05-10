export interface SaveSubCodificacion{
  codigoSubcategoria: number
  descripcion: string
  createdBy: string
  categoriaId: number
}

export interface UpdteSubCodificacion{
  subCategoriesId: number
  codigoSubcategoria: number
  descripcion: string
  statusId: number
  categoriaId: number
  modifiedBy: string
}
