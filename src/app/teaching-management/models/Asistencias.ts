export interface StudenAsistence {
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

