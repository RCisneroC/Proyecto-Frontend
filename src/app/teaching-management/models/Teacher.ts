
export class Teacher {
    teacherId: number=-1;
    cedula: string="";
    name: string="";
    lastName: string="";
    email:string="";
    applicationDate?: string;
    selected: boolean=false;
    statusId: number=0;
    dischargeDate: string="";
    placeResidence: string="";
    listCourse: Course[]=[];
    listTraining: Training[]=[];
    listSpecialty: Specialty[]=[];
    listExperience: Experience[]=[];
    listDocument: Documents[]=[];
    process: number=0;
}

export interface Course {
    courseId: number;
    year: number;
    name:string;
}


export class Training  {
        trainingId: number=-1;
        institution: string="";
        completionDate: string="";
        city: string="";
        degreeDate: string="";
        degreeObtained: string="";
        statusId: number=1;
}

export interface Specialty {
    specialtyId: number;
    name:string;
}

export class Experience {
    experienceId: number=-1;
    description: string="";
    position: string="";
    startDate: string="";
    endDate: string="";
    statusId: number=1;
}


    export class Documents  {
        documentId: number=-1;
        doc: string="";
        docResult! :Poster;
        extension: string="";
        docType: number=-1;
        description: string | null="";
    }
    
    
    export interface Poster {
        fileContents:          string;
        contentType:           string;
        fileDownloadName:      string;
        lastModified:          string;
        entityTag:             string;
        enableRangeProcessing: boolean;
    }
    export class fileDetails{
    
        fileDetails!:any;
        fileType:number=1;
    }
    
 
    


