export interface ResponseInscripcionEF{
  message: string;
  isError: boolean;
  statusCode: number;
  inscriptionResponse:[{
    firstName:         string;
    lastName:          string;
    cedula:            string;
    dateOfBirth:        Date;
    placeOfBirth:       string;
    residentialAddress:  string;
    telephoneNumber:    string;
    email:            string;
    degreeId:           number;
    aspirantId:        number;
    inscriptionId:     number;
  }]
}

export interface ResponseModifyStudent{
  message: string;
  isError: boolean;
  statusCode: number;
}
