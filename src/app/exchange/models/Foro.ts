export interface ForoResponse {
  getForos: Foro[],
  message: string,
  isError: boolean,
  statusCode: number
}

export interface Foro {
  foroId: number,
  title: string,
  description: string,
  createdDate: Date,
  createdBy: string,
  statusId: number,
  categoriesId: number,
  categoriesName: string
}

export interface GetComment {
  foroId: number;
  commentId: number;
  firstName: string;
  lastName: string;
  tituloForo: string;
  descripcionForo: string;
  categories: string;
  comment: string;
  fechaInicioForo: Date;
  fechaFinForo: Date;
  fechaComent: Date;
}

export interface CommetForo {
  getComment: GetComment[];
  message: string;
  isError: boolean;
  statusCode: number;
}
