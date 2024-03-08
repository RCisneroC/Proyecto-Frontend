import { Component, Inject, OnInit } from '@angular/core';
import { AuthService, User } from '@core';
import { UserService } from 'app/security/user/service/user.service';
import { DirectoryService } from '../../services/directory.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FoodNode } from '../directory-list.component';
import { FolderPermission } from 'app/admission/models/directory';
import { file } from 'jszip';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';

interface DialogData {
  folder: FoodNode;
  action: string;

  // Add other properties as needed, like path, parent folder, etc.
}


@Component({
  selector: 'app-add-permissions',
  templateUrl: './add-permissions.component.html',
  styleUrls: ['./add-permissions.component.scss'],
})
export class AddPermissionsComponent implements OnInit {
  //dataSourceUser: any;
  
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
  dataSourcePermission: any[] = [];
  dataSourceUser: User[] = [];
  fileFolderId!: number;
  userSelected!: string;
  first!: boolean;
  user: User;
  files: FolderPermission = new FolderPermission();
  folder: FolderPermission = new FolderPermission();
  datos: FolderPermission = new FolderPermission();
  dialogTitle!: string;

  constructor(
    public _userService: UserService,
    public _directoryService: DirectoryService,
    public dialogRef: MatDialogRef<AddPermissionsComponent>,
    public authenticationService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.user = this.authenticationService.currentUserValue;
  }
  ngOnInit(): void {
    this.dialogTitle=this.data.folder.folderName
    this.getAllUserRolDocumentaria();
  }

  getAllUserRolDocumentaria() {
    this._userService.getAllUsers2().subscribe({
      next: (res: User[]) => {
        this.dataSourceUser = res.filter(x=> x.roles[0]==="Gestor Documental");
      },
    });
  }

  onSelectionChange(event: any) {
    if (this.data.action == 'file') {
      this.fileFolderId = this.data.folder.fileId;
    
    } else {
      this.fileFolderId = this.data.folder.folderId;
    }

    this.userSelected = event.options[0].value;
    this._directoryService
      .getPersmissionUser(this.userSelected, this.fileFolderId)
      .subscribe({
        next: (res: any) => {
        this.first=false;
        if( res['dataResult'] == null){
        this.first=true;
        }
         
          this.datos = res['dataResult'] == null ? [] : res['dataResult'][0];
          this.dataSourcePermission = [];
          this.folder=new FolderPermission();
          
       
            this.folder.userFolderId = this.fileFolderId;
            this.folder.userFileId =this.fileFolderId;
            this.folder.userId = this.userSelected;
            this.folder.hasWritePermission = this.datos.hasWritePermission===undefined?false:this.datos.hasWritePermission;
            this.folder.hasReadPermission = this.datos.hasReadPermission===undefined?false:this.datos.hasReadPermission;
            this.folder.hasExecutePermission = this.datos.hasExecutePermission===undefined?false:this.datos.hasExecutePermission;
            this.folder.hasOnloadfile = this.datos.hasOnloadfile===undefined?false:this.datos.hasOnloadfile;
            this.folder.update = this.datos.update===undefined?false:this.datos.update;
            this.folder.delete = this.datos.delete===undefined?false:this.datos.delete;
            this.folder.createdBy = this.user.id;
            this.folder.lastModifiedBy=this.user.id;
          
          // }else{
          //   this.files.folderId = this.data.folder.fileId;
          //   this.files.userId = this.userSelected;
          //   this.files.hasWritePermission = this.datos.hasWritePermission;
          //   this.files.hasReadPermission = this.datos.hasReadPermission;
          //   this.files.hasExecutePermission = true;
          //   this.files.update = this.datos.update;
          //   this.files.delete = this.datos.delete;
          //   this.files.createdBy = this.user.id;
          
          // }
         
          if (this.datos !== null) {
           
          if(this.data.action!="file"){
          
            this.dataSourcePermission = [
              {
                name: 'Nueva carpeta',
                valor: this.datos.hasWritePermission,
                id:0
              },
              {
                name: 'Cambiar nombre',
                valor: this.datos.update,
                id:1
              },

              {
                name: 'Cargar archivo',
                valor: this.datos.hasOnloadfile,
                id:2
              }
              
              
            ];
          
        }else{
       
          this.dataSourcePermission = [
            {
              name: 'Cambiar nombre',
              valor: this.datos.update,
              id:1
            },
            {
              name: 'Descargar archivo',
              valor: this.datos.hasExecutePermission,
              id:4
            },
            {
              name: 'Visualizar archivo',
              valor: this.datos.hasReadPermission,
              id:3
            },

            {
              name: 'Remplazar archivo',
              valor: this.datos.delete,
              id:5
            },
          ];
        }
        
       
        
      }
    }  
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectionChange2(event: any) {
    const x=event.options[0].value;
    const select=event.options[0].selected;
    // if (this.data.action === 'file') {
    //   this.files.folderId = this.data.folder.fileId;
    //   this.files.userId = this.userSelected;
    //   this.files.hasWritePermission = x==0?select:this.files.hasWritePermission;
    //   this.files.hasReadPermission = x==3?select:this.files.hasReadPermission;
    //   this.files.hasExecutePermission = true;
    //   this.files.update = x==1?select:this.files.update;
    //   this.files.delete = x==5?select:this.files.delete;
    //   this.files.createdBy = this.user.id;
    // } else {
      this.folder.userFolderId = this.fileFolderId;
      this.folder.userFileId = this.fileFolderId;
      this.folder.userId = this.userSelected;
      this.folder.hasWritePermission = x==0?select:this.folder.hasWritePermission;
      this.folder.hasReadPermission = x==3?select:this.folder.hasReadPermission;
      this.folder.hasExecutePermission = x==4?select:this.folder.hasExecutePermission;
      this.folder.hasOnloadfile = x==2?select:this.folder.hasOnloadfile;
      this.folder.update = x==1?select:this.folder.update;
      this.folder.delete = x==5?select:this.folder.delete;
      this.folder.createdBy = this.user.id;
      this.folder.lastModifiedBy=this.user.id;
    //}
  }

  onSubmit() {
  if(this.first){
    if (this.data.action==="file"){
      this.addPermissionUserFiles();
    }else{
      this.addPermissionUserFolder();
    }
    
    
  }else{
  if (this.data.action==="file"){
    this.updatePermissionUserFiles();
  }else{
    this.updatePermissionUserFolder();
  }
    
   
  }
   
   
    
  }

  updatePermissionUserFolder() {
    this._directoryService.UpdatePersmissionUserFolder(this.folder).subscribe({
      next: (res) => {
      
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Permiso guardado.';
        this.dialogRef.close(this.ResponseMessage);
      
      },
    });
  }

  updatePermissionUserFiles() {
    this._directoryService.UpdatePersmissionUserFiles(this.folder).subscribe({
      next: (res) => {
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Permiso guardado.';
        this.dialogRef.close(this.ResponseMessage);
      
      },
    });
  }
  
  
    addPermissionUserFolder() {
    this._directoryService.addPersmissionUserFolder(this.folder).subscribe({
      next: (res) => {
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Permiso guardado.';
        this.dialogRef.close(this.ResponseMessage);
      },
    });
  }
  
  addPermissionUserFiles() {
    this._directoryService.addPersmissionUserFiles(this.folder).subscribe({
      next: (res) => {
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Permiso guardado.';
        this.dialogRef.close(this.ResponseMessage);
      },
    });
  }
}
