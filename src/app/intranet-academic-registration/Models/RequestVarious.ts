import {CalificacionesECModels} from "../../enrollment/models/calificacionEC";

export interface RequestVarious {
    id: number;
    name: string;
    lastname: string;
    idSolicitante: string;
    numberPhone: string;
    email: string;
    typeUser: number;
    typeRequest: number;
    nameTypeRequest: string;
    typeActivityAcademy: number;
    idSubjectOrActivity: number;
    nameActivitySubject: string;
    dateCreate: Date;
    statusId: number;
    comments: string;
}


export interface SearchRequestVariousResponse{
  statusCode: number;
  success: boolean;
  message: string;
  data: RequestVariousItem[]
  errors: string;
}

export interface RequestVariousItem {
  id: number,
  createdDate: Date,
  createdBy: string,
  lastModifiedDate: Date,
  lastModifiedBy: string,
  totalRecords: number,
  userRequest: string,
  description: string,
  assignedUser: string,
  requestVariousTypeId: number,
  requestVariousApplicantUserTypeId: number,
  requestVariousStatusTypeId: number,
  requestDate: Date,
  subjectId: number,
  activityId: number,
  efAcademicRecordId: number,
  ecAcademicRecordId: number,
  reentryAll: boolean,
  response: string,
  responseDate: Date
}

//tipo solicitante
// 1 docente
// 2 estudiante (carrera formal).
// 3 participante (cursos).
/**
 * typeSolicitud:
 * Peticiones informativas. (1)
 * quejas. (2)
 * sugerencias. (3)
 * reclamos por actividad o examen en plataforma. (4)
 * retiros. (5)
 * reingresos. (6)
 * reclamos por deficiencias de servicios tecnologicas de la entidad educativa. (7)
 * solicitudes de estudiantes y participantes. (8)
 */
