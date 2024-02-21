import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodNode } from '../directory-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { DirectoryService } from '../../services/directory.service';
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
  constructor(private fb: FormBuilder,
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
  
 
    this.folderForm = this.fb.group({
      //parentId:[null],
      folderName: [data.folder==null?'':data.folder.folderName, Validators.required],
    });
  }
  
  folderForm: FormGroup;
  
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSubmit() {
 
    if (this.folderForm.valid) {
    
    if(this.data.action==='file'){
    
      const data={
        folderId:this.data.folder.folderId,
        fileId:this.data.folder.fileId,
        newName:this.folderForm.get('folderName')?.value,
      }

      this._directoryService.UpdateFile(data).subscribe({
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
    
      const data={
        FolderId:this.data.folder.folderId,
        NewFolderName:this.folderForm.get('folderName')?.value,
        ModifiedBy:"Ricardo cisnero"
    
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