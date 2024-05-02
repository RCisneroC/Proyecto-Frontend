export interface TeacherPointsCat{
  id:number;
  description: string;
  category: string;
  points: number;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
  idAsignatura: number;
  idActivity: number;
  idNivelEducativo: number;
}


export interface TeacherPointsEduLevel {
  id:number;
  name: string,
  points: number;
  estatus: boolean,
  createdDate: Date;
  createdBy: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
}

export interface TeacherPointsExp {
  id:number;
  experiencia: string,
  points: number;
  estatus: boolean,
  createdDate: Date;
  createdBy: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
}
