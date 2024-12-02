export interface AuditLogModel {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
  auditLogs: AuditLog[]
}

export interface AuditLog {
  id: number
  entityNametimestamp: string
  eventType: number
  userId: string
  entityName: string
  timestamp: string
  requestUrl:string;
  message: any
  oldData: any
  newData: string
}


