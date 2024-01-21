
export class Teacher {
    teacherId: number=-1;
    cedula: string="";
    name: string="";
    lastName: string="";
    email:string="";
    applicationDate?: string;
    selected: boolean=false;
    dischargeDate: string="";
    placeResidence: string="";
    listCourse: Course[]=[];
    listTraining: Training[]=[];
    listSpecialty: Specialty[]=[];
    process: number=0;
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

