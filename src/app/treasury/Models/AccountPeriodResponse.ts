export interface AccountPeriodResponse {
  getPeriodContables: GetPeriodContable[]
  message: string
  isError: boolean
  statusCode: number
}

export interface GetPeriodContable {
  periodoId?: number
  fechaInicio?: string
  fechaFin?: string
  descripcion?: string
  statusId?: number
  createdBy?: string
  createdDate?: string
  actions?: string
}



export interface AccountPeriodResponse1 {
  getPeriodContables: GetPeriodContable1[]
  message: string
  isError: boolean
  statusCode: number
}

export interface GetPeriodContable1 {
  periodoId?: number
  fechaInicio?: string
  fechaFin?: string
  descripción?: string
  statusId?: number
  createdBy?: string
  createdDate?: string
  actions?: string
}
