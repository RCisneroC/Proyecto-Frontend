import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodNode } from '../directory-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { DirectoryService } from '../../services/directory.service';
import { AuthService, User } from '@core';
interface DialogData {
  idChildren:number;
  name: string;
  folder:FoodNode;
  action:string;
 
  // Add other properties as needed, like path, parent folder, etc.
}
@Component({
  selector: 'app-add-directory',
  templateUrl: './add-directory.component.html',
  styleUrls: ['./add-directory.component.scss']
})
export class AddDirectoryComponent {

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
  id!:number;
  user: User;
  constructor(private fb: FormBuilder,
    public authenticationService:AuthService,
    public _directoryService:DirectoryService,
    public dialogRef: MatDialogRef<AddDirectoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  
  if(data.folder==undefined){
  this.id=localStorage.getItem("Raiz")?.length||0;
  this.id=this.id+1;
  }else if(data.folder.folderId==undefined){
  this.id=data.folder.fileId;
  }else{
  this.id=data.folder.folderId;
  }
  
  this.user = this.authenticationService.currentUserValue;
  
    this.folderForm = this.fb.group({
      parentId:null,// agregue este parametro null
      createdBy:this.user.id,
      folderName: [data.folder==null  || this.data.action==='newfolder'?'':data.folder.folderName, Validators.required],
    });
  }
  
  folderForm: FormGroup;
  
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSubmit() {
 
    if (this.folderForm.valid) {
    
    if(this.data.action==='file'){
    
      const formdata=new FormData();
      formdata.append('FolderId',this.data.folder.folderId.toString());
      formdata.append('FileId',this.data.folder.fileId.toString());
      formdata.append('NewName',this.folderForm.get('folderName')?.value);
      formdata.append('modifiedBy',this.user.id);
      this._directoryService.UpdateFile(formdata).subscribe({
        next: () => {
        
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Archivo guardado.';
          this.dialogRef.close(this.ResponseMessage);
        
         },
         error: (err:any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = err;
          this.dialogRef.close(this.ResponseMessage);
        }
      });
    }else{

    if(this.data.folder===null){
  
    this._directoryService.addFolder(this.folderForm.getRawValue()).subscribe({
      next: () => {
      
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'carpeta guardada.';
        this.dialogRef.close(this.ResponseMessage);
      
       },
       error: (err:any) => {
        this.ResponseMessage.CodError = 500;
        this.ResponseMessage.Message = err;
        this.dialogRef.close(this.ResponseMessage);
      }
    });
    }else{
    
    if(this.data.action==='newfolder'){
    
      const data={
        parentId:this.data.folder.folderId,
        folderName:this.folderForm.get('folderName')?.value,
        createdBy:this.user.id
    
      }
      this._directoryService.addFolder(data).subscribe({
        next: () => {
        
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'carpeta guardada.';
          this.dialogRef.close(this.ResponseMessage);
        
         },
         error: (err:any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = err;
          this.dialogRef.close(this.ResponseMessage);
        }
      });
    }else{
    
   
      const data={
        FolderId:this.data.folder.folderId,
        NewFolderName:this.folderForm.get('folderName')?.value,
        modifiedBy:this.user.id,
        statusId:1
    
      }
      this._directoryService.UpdateFolder(data).subscribe({
        next: () => {
        
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'nombre actualizado.';
          this.dialogRef.close(this.ResponseMessage);
        
         },
         error: (err:any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = err;
          this.dialogRef.close(this.ResponseMessage);
        }
      });
    }
  }
    
  }
  }
}
}