import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodNode } from '../directory-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
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
    public dialogRef: MatDialogRef<AddDirectoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  
  if(data.folder==undefined){
  this.id=localStorage.getItem("Raiz")?.length||0;
  this.id=this.id+1;
  }else if(data.folder.idFolder==undefined){
  this.id=data.folder.idChildren;
  }else{
  this.id=data.folder.idFolder;
  }
  
 
    this.folderForm = this.fb.group({
      idFolder:[this.id, Validators.required],
      name: ['', Validators.required],
      children:[[]],
    });
  }
  
  folderForm: FormGroup;
  
  onSubmit() {
 
    if (this.folderForm.valid) {
    
      const storedData: any[] = JSON.parse(localStorage.getItem('Raiz')||'');
      //localStorage.setItem("Raiz",this.folderForm.getRawValue());
      let filteredFolders = storedData.filter((folder) => folder.idFolder === this.folderForm.get("idFolder")?.value);
      if(filteredFolders.length===0){
      
       filteredFolders = storedData.filter((folder) => folder.children.idChildren === this.folderForm.get("idFolder")?.value);
      }
     const data ={
        idFolder:storedData.length+1,
        name: this.folderForm.get("name")?.value,
        children: [],
      }
     // filteredFolders.push(data);
      storedData.push(data);
      localStorage.setItem('Raiz',JSON.stringify(storedData));
      
      console.log(localStorage.getItem("Raiz"));
      this.ResponseMessage.CodError = 200;
      this.ResponseMessage.Message = 'Carpeta guardada.';
      this.dialogRef.close(this.ResponseMessage);
      //this.folderForm.reset();
    }
    
   
  }
}
