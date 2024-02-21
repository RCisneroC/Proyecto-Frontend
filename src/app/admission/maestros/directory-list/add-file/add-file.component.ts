import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from 'app/security/models/role';
import { FoodNode } from '../directory-list.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { DirectoryService } from '../../services/directory.service';
interface DialogData {
  fileId:number;
  folderName: string;
  folder:FoodNode;
  action:string;
 
  // Add other properties as needed, like path, parent folder, etc.
}
@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent {

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
  action: string | undefined;
  dialogTitle: string | undefined;
  roleForm: UntypedFormGroup;
  role!: Role;
  FormsEFDocument: UntypedFormGroup;
  fileName!: string;
  fileExtension!: string;
  
  constructor(
    public dialogRef: MatDialogRef<AddFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _directoryService: DirectoryService,
    private fb: UntypedFormBuilder
  ) { 
  
    this.roleForm = this.createContactForm();
    this.FormsEFDocument = this.fb.group({
      file: [[],[Validators.required]]
    });
  }


  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.data.folder.folderId],
      name: [this.data.folder.folderName, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  tmp_files :any[50] = [];
  onFileSelected(event:any){
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target?.files[0];
      this.fileName = file.name;
      this.tmp_files[0]=(event.target.files[0]);
      //const extension = getExtension(file.name);
      //const extension = file.type.split('/')[1];
      this.fileExtension = file.type.split('/')[1];
      // ... usar el nombre del archivo
    }
  
  }
  
  

  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.FormsEFDocument.valid) {
    
      if(this.data.action==='file'){
    
        const formdata=new FormData();
        formdata.append('FolderId',this.data.folder.folderId.toString());
        formdata.append('FileId',this.data.folder.fileId.toString());
        formdata.append('File',this.tmp_files[0]);
  
        this._directoryService.UpdateFile(formdata).subscribe({
          next: () => {
          
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Archivo remplazado.';
            this.dialogRef.close(this.ResponseMessage);
          
           },
           error: (err:any) => {
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = err;
            this.dialogRef.close(this.ResponseMessage);
          }
        });
      }else{
      
    
       if(this.tmp_files[0]!=undefined){
        const formdata=new FormData();
         formdata.append('FolderId',this.data.folder.folderId.toString());
         formdata.append('File',this.tmp_files[0]);
    
      this._directoryService.addFile(formdata).subscribe({
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
     
    }
}

}
}   
} 
    //   const storedData: any[] = JSON.parse(localStorage.getItem('Raiz')||'');
    //   //localStorage.setItem("Raiz",this.folderForm.getRawValue());
    //   let filteredFolders = storedData.filter((folder) => folder.idFolder === this.data.folder.folderId);
    //   if(filteredFolders.length===0){
      
    //    filteredFolders = storedData.filter((folder) => folder.children.idChildren === this.data.folder.folderId);
    //   }
    //  const data ={
    //     idChildren:this.data.folder.folderId+1,
    //     name: this.fileName,
    //     extension: this.fileExtension,
    //   }
    //  // filteredFolders.push(data);
    //   filteredFolders[0].children?.push(data);
    
    //   //const allObjects = storedData.concat(filteredFolders[0]);
    //   localStorage.setItem('Raiz',JSON.stringify(storedData));
      
    //   console.log(localStorage.getItem("Raiz"));
    //   this.ResponseMessage.CodError = 200;
    //   this.ResponseMessage.Message = 'Carpeta guardada.';
    //   this.dialogRef.close(this.ResponseMessage);
      //this.folderForm.reset();
    

  
