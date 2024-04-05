export interface CategoryResponse {
  getCategoriesResponse: Category[],
  message: string,
  isError: boolean,
  statusCode: number
}

export interface Category {
  categorieId: number,
  name: string,
  descripion: string,
  createdDate: Date,
  createdBy: string
}
