
export interface ExpensesResponse {
  message: string
  isError: boolean
  statusCode: number
  gastos: Expenses[]
}

export interface Expenses {
  gastoId: number,
  codigoGasto: number,
  descripcion: string,
  categoriaId: number,
  statusId: number,
  statusDescripcion: string,
  createdDate: Date,
  createBy: string,
  tipoGasto: string,
  monto: number
}

