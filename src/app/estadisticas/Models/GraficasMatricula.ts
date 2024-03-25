export interface GraficasMatricula {
    startDate: Date;
    endDate: Date;
    getIndicadoresEstadistico: GetIndicadoresEstadistico[];
    message: string;
    isError: boolean;
    statusCode: number;
}

export interface GetIndicadoresEstadistico {
    estudiantePorSexo: EstudiantePorSexo[];
    estudianteConDiscapacidad: number;
    estudiantePorProvincia: EstudiantePorProvincia[];
    porPrograma: PorPrograma[];
    estudiantePorEdad: EstudiantePorEdad[];
}

export interface EstudiantePorEdad {
    year: number;
    cantidad: number;
}

export interface EstudiantePorProvincia {
    provincia: string;
    cantidad: number;
}

export interface EstudiantePorSexo {
    sexo: string;
    cantidad: number;
}

export interface PorPrograma {
    programa: string;
    cantidad: number;
}