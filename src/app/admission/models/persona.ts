export interface Persona {
    datasetPersona: DatasetPersona;
}

export interface DatasetPersona {
    personaPublica:      PersonaPublica;
    personaConfidencial: PersonaConfidencial;
    imagenes:            Imagenes;
}

export interface Imagenes {
    urlFoto:  string;
    urlFirma: string;
}
export interface PersonaConfidencial {
    primer_nombre_madre:    string;
    apellido_paterno_madre: string;
    apellido_materno_madre: string;
    primer_nombre_padre:    string;
    apellido_paterno_padre: string;
    apellido_materno_padre: string;
    nombre_centro:          string;
    provincia_nombre:       string;
    distrito_nombre:        string;
    corregimiento_nombre:   string;
    cedula_madre:           string;
    cedula_padre:           string;
}

export interface PersonaPublica {
    provincia:                string;
    tomo:                     string;
    asiento:                  string;
    cedula:                   string;
    primer_nombre:            string;
    segundo_nombre:           string;
    apellido_paterno:         string;
    apellido_materno:         string;
    fecha_nacimiento:         Date;
    sexo:                     string;
    estado_civil:             string;
    pais:                     string;
    prov:                     string;
    distrito:                 string;
    corregimiento:            string;
    fecha_vencimiento_cedula: Date;
    lugarnacimientope:        string;
    lugarDeNacimiento:        string;
    barrio_residencia:        string;
    calle_residencia:         string;
    edificio_casa:            string;
    nombreCedula:             string;
}
