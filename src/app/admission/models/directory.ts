export interface Directory {
    id:number;
    name: string
    statusId:number
  }
  
  
  export interface FileData {
    id: number;
    fileName: string;
    fileTypeName: string;
    file: string; // Or consider using Blob or any suitable file representation type
    contentType: string;
  }
  export interface Data {
    dataResult:FileData[]
  
  }