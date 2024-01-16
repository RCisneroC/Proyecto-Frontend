
export interface Teacher {
    teacherId: number;
    cedula: string;
    name: string;
    lastName: string;
    applicationDate: string;
    selected: boolean;
    dischargeDate: string;
    placeResidence: string;
    jobTitle: string;
    graduateDegree: string;
    professionalExperience: string;
    teachingExperience: string;
    listCourse: Course[];
    listTraining: Training[];
    listSpecialty: Specialty[];
    process: number;
    topics: number;
}

export interface Course {
    courseId: number;
    year: number;
}

export interface Training {
    trainingId: number;
    year: number;
    typeId: number;
}

export interface Specialty {
    specialtyId: number;
}

