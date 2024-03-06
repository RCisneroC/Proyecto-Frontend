export class StudentData{
  firstName: string = "";
  lastName: string = "";
  secondsurname: string = "";
  cedula: string = "";
  email: string = "";
  gender: string = "";
  //aspirante
  dateOfBirth: string = "";
  placeOfBirth: string = "";
  residentialAddress: string = "";
  telephoneNumber: string = "";
  homePhoneNumber: any;
  bloodtype: string = "";
  maritalStatus: string = "";
  nameOfspouse: string = "";
  numberofchildren: string = "";
  caseOfemergency: string = "";
  telephoneNumberEmergency: string = "";
  specialCapacity: boolean = true;
  visual: boolean  = true;
  auditory: boolean = true;
  cognitive: boolean = true;
  physical: boolean = true;
  usesAwheelchair: boolean = true;
  specific: string = "";
  others: string = "";
  //participante
  institution: string = "";
  university: string = "";
  dependency: string = "";
  cooperatingEntity: string = "";
  position: string = "";
  province: string = "";
  judicialDistrict: string = "";
  invitationDate: string = "";
}


export class Student {
    studentId: number = -1;
    cedula: string = "";
    name: string = "";
    lastName: string = "";
    email: string = "";
    applicationDate?: string;
    selected: boolean = false;
    statusId: number = 0;
    dischargeDate: string = "";
    placeResidence: string = "";
    listCourse: Course[] = [];
    listTraining: Training[] = [];
    listSpecialty: Specialty[] = [];
    listExperience: Experience[] = [];
    listDocument: Documents[] = [];
    listActivity: Activity[] = [];
    listSubject: Subject[] = [];
    process: number = 0;
}

export interface Course {
    courseId: number;
    year: number;
    name: string;
}


export class Training {
    trainingId: number = -1;
    institution: string = "";
    completionDate: string = "";
    city: string = "";
    degreeDate: string = "";
    educationLevel: string = "";
    degreeObtained: string = "";
    statusId: number = 1;
}

export interface Specialty {
    specialtyId: number;
    name: string;
}

export class Experience {
    experienceId: number = -1;
    description: string = "";
    position: string = "";
    startDate: string = "";
    endDate: string = "";
    statusId: number = 1;
}

export class EducationalInfo {
  educationalInfoId: number = -1;
  description: string = "";
  title: string = "";
  startDate: string = "";
  endDate: string = "";
  statusId: number = 1;
}


export class Documents {
    documentId: number = -1;
    doc: string = "";
    docResult!: Poster;
    extension: string = "";
    docType: number = -1;
    description: string | null = "";
}


export class Activity {

    id!: number;
    name!: string;
    activityTypeId!: number;
    activityModeId!: number;
    startDate!: string;
    plannedEndDate!: string;

}

export class Subject {
    id!: number;
    name!: string;
    description!: string;
    acronym!: string;
    code!: string;
    numOfCredits!: number;
    numOfHours!: number;
    numOfClasses!: number;
    hasLaboratory!: boolean;
    evaluationCriteria!: string;
    statusId!: number;
    listTask: TaskSubject[] = [];
}

export class TaskSubject {
    id!: number;
    Titulo!: string;
    observacion!: string;
    tipoTarea!: string;
    nombre!: string;
    fechaEntrega!: Date;
    idAsignatura!: string;
    type!: string;
}

export interface Poster {
    fileContents: string;
    contentType: string;
    fileDownloadName: string;
    lastModified: string;
    entityTag: string;
    enableRangeProcessing: boolean;
}
export class fileDetails {

    fileDetails!: any;
    fileType: number = 1;
}


export interface ResponseSaveTeacher {
    idRegistro: number;
}

export interface RequestActivityTeacher {
    teacherId: number;
    activityList: number[];
}

export interface RequestSubjectTeacher {
    teacherId: number;
    subjectList: number[];
}




export interface SubjectResponse {
    startDate: Date;
    endDate: Date;
    examDate: Date;
    classShift: number;
    teacherCedula: string;
    moodleCourseId: number;
    periodId: number;
    year: number;
    roomId: number;
    subjectStatusId: number;
    subjectId: number;
    subjectName: string;
    subjectDescription: string;
    subjectAcronym: string;
    subjectCode: string;
    subjectNumOfCredits: number;
    subjectNumOfHours: number;
    subjectNumOfClasses: number;
    subjectHasLaboratory: boolean;
    subjectEvaluationCriteria: string;
}
