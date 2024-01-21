
export class Teacher {
    teacherId: number=-1;
    cedula: string="";
    name: string="";
    lastName: string="";
    applicationDate?: string;
    selected: boolean=false;
    dischargeDate: string="";
    placeResidence: string="";
    jobTitle: string="";
    graduateDegree: string="";
    professionalExperience: string="";
    teachingExperience: string="";
    listCourse: Course[]=[];
    listTraining: Training[]=[];
    listSpecialty: Specialty[]=[];
    process: number=0;
    topics: number=0;
}

export interface Course {
    courseId: number;
    year: number;
    name:string;
}

export interface Training {
    trainingId: number;
    name:string;
    year: number;
    typeId: number;
}

export interface Specialty {
    specialtyId: number;
    name:string;
}

