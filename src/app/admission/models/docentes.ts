export interface DetalleDocente {
    cedula:                 number;
    name:                   string;
    lastName:               string;
    applicationDate:        Date;
    selected:               boolean;
    dischargeDate:          Date;
    placeResidence:         string;
    jobTitle:               string;
    graduateDegree:         string;
    professionalExperience: string;
    teachingExperience:     string;
    listCourse:             ListCourse[];
    listTraining:           ListTraining[];
    listSpecialty:          ListSpecialty[];
    process:                number;
    topics:                 number;
}

export interface ListCourse {
    courseId: number;
    year:     number;
}

export interface ListSpecialty {
    specialtyId: number;
}

export interface ListTraining {
    trainingId: number;
    year:       number;
    typeId:     number;
}
