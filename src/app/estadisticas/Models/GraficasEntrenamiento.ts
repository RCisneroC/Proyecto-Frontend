export interface GraficasEntrenamiento {
    startDate: Date;
    endDate: Date;
    getGraphicsEstadistico: GetGraphicsEstadistico[];
    message: string;
    isError: boolean;
    statusCode: number;
}

export interface GetGraphicsEstadistico {
    psrticipantePorSexo: PsrticipantePorSexo[];
    estudiantePorProvincia: EstudiantePorProvincia[];
    porUniversidad: PorUniversidad[];
    estudiantePorEdad: any;
    participantePorCurso: ParticipantePorCurso[];
}

export interface EstudiantePorProvincia {
    provincia: string;
    cantidad: number;
}

export interface ParticipantePorCurso {
    actividad: string;
    cantidad: number;
}

export interface PorUniversidad {
    programa: string;
    cantidad: number;
}

export interface PsrticipantePorSexo {
    sexo: string;
    cantidad: number;
}
