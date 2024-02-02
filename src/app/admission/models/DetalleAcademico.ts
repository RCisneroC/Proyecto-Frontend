export interface DetalleAcademico{
    educationalLevelId:number;
    obtainedTitle:string;
    institution:string;
    city:string;
    completionDate:Date;
    startDate:Date;
    academicInstitutionId:number;
}

export interface DetalleAcademicoExt{
  obtainedTitle:string;
  institution:string;
  program:string;
  year:number;
}
