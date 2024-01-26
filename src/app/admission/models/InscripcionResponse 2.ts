export interface ResponseInscripcion{
    backOffice:        number;
    firstName:         string;
    lastName:          string;
    secondsurname:     string;
    gender:            string;
    id:                string;
    cedula:            string;
    institution:       string;
    email:             string;
    university:        string;
    dependency:        string;
    cooperatingEntity: string;
    position:          string;
    province:          string;
    judicialDistrict:  string;
    invitationDate:    Date;
    observation:       string;
    activityId:        number;
    inscriptionId:     number;
    createdBy:         string;
    message:           string;
    isError:           boolean;
    statusCode:        number;
}
