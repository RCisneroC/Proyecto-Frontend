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
