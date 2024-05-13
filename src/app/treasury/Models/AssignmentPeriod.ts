export interface AssignmentPeriod {
  periodoAsignacionid:number,
  asignacionBienActivosFijosId: number;
  temporal: boolean;
  permanente: boolean;
  recibe: string;
  cargo: string;
  nombre: string;
  firma: boolean;
  firmaJefe: boolean;
  nombreJefe: string;
  cargoJefe: string;
  validadoPor: string;
  statusIdValidadoPor: string;
  revisadoPor: string;
  statusIdRevisadoPor: string;
  aprobadoPor: string;
  createdBy: string;
  statusId: number;
  }