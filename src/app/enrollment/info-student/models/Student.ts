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
    listExperience: Experience[] = [];
    listDocument: Documents[] = [];
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

