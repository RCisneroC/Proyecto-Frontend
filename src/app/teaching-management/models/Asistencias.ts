export interface StudenAsistence {
  statusId?: number;
  startDate: Date;
  idEstudiante: string;
  cedula: string;
  name: string;
  lastname: string;
  id: number;
  idasignatura: string;
  docente: string;
  type: string;
  date?: Date;
  attended?: boolean;
}

export interface CalificacionEstudiante {
  statusId: number;
  startDate: Date;
  idEstudiante: string;
  cedula: string;
  name: string;
  lastname: string;
  id: number;
  idasignatura: string;
  docente: string;
  type: string;
  calificacion: string;
  nameTarea: string;
  idTask: number;
}

export interface Student {
  asignatura: string;
  asignaturaId: number;
  cedula: string;
  codigo: string;
  degreeId: number;
  descriptionRoom: string;
  descriptionSuject: string;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  mallaId: number;
  mallaName: string;
  nAmeDegree: string;
  numOfCredits: number;
  periodDescription: string;
  degreeCurriculumDesignId: number;
  periodName: string;
  periodsId: number;
  roomId: number;
  salonGrupo: string;
  studentId: number;

}

export interface AcademicRecord {
  data: generico[];

}


export interface Asist {
  data: StudenAsistence[];

}

export interface generico {
  id: number;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string | null;
  lastModifiedBy: string | null;
  totalRecords: number;
  requestVarious: []; // Assuming empty array of unknown type
  efAcademicRecordId: number;
  subjectId: number;
  isReentry: boolean;
  subjectApproved: string | null;
  finalScore: number;
  entryYear: number;
}

