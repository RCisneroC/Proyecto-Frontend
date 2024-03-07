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
  export interface DataD {
    dataResult:DirectoryData[]
    
  }
  

export interface DirectoryData {
  id: number;
  changeType: string;
  fileName: string;
  folderName:string;
  extension: string;
  createdDate: string;
  by: string;
  lastModifiedDate: string;
  fileId: number;
  folderId: number;
  action: string;
  folder:DirectoryData;
}

export class FolderPermission {
  folderId!: number;
  userFileId!:number;
  userId!: string;
  hasWritePermission: boolean=false;
  hasReadPermission: boolean=false;
  hasExecutePermission: boolean=false;
  update: boolean=false;
  delete: boolean=false;
  createdBy!: string;
  lastModifiedBy!:string;
  statusId:number=1;
  
  }