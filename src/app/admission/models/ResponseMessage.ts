export interface ResponseMessageMaestra {
    CodError:number;
    Message: string;
}

export interface ResponseMessageExtended {
  CodError:number;
  Message: string;
  status: number;
}

export interface ResponseGenerica {
  id: number;
  message: string;
  Details: string;
  StatusCode: number;
}

export interface DataModal {
   id: string;
    action: string;
    data: any;
}

export interface ResponseEF{
   isError: number;
  message: string;
  statusCode: number;
}
