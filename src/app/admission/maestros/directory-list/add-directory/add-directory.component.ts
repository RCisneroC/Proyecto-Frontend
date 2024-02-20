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
      folderName: ['', Validators.required],
    });
  }
  
  folderForm: FormGroup;
  
  onSubmit() {
 
    if (this.folderForm.valid) {
    
      this._directoryService.addFolder(this.folderForm.getRawValue()).subscribe({
        next: () => {
        
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Archivo cargado.';
          this.dialogRef.close(this.ResponseMessage);
        
         },
         error: (err:any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = err;
          this.dialogRef.close(this.ResponseMessage);
        }
      });
      //this.folderForm.reset();
    }
    
   
  }
}
