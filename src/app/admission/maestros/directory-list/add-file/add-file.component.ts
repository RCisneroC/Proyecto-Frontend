import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from 'app/security/models/role';
import { FoodNode } from '../directory-list.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { DirectoryService } from '../../services/directory.service';
import { AuthService, User } from '@core';
interface DialogData {
  fileId: number;
  folderName: string;
  folder: FoodNode;
  action: string;

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
    Message: ''
  }
  action: string | undefined;
  dialogTitle: string | undefined;
  roleForm: UntypedFormGroup;
  role!: Role;
  FormsEFDocument: UntypedFormGroup;
  fileName!: string;
  fileExtension!: string;
  user!: User;

  constructor(
    public dialogRef: MatDialogRef<AddFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _directoryService: DirectoryService,
    public authenticationService: AuthService,
    private fb: UntypedFormBuilder
  ) {

    this.user = this.authenticationService.currentUserValue;
    this.roleForm = this.createContactForm();
    this.FormsEFDocument = this.fb.group({
      file: [[], [Validators.required]]
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
  tmp_files: any[50] = [];
  onFileSelected(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target?.files[0];
      this.fileName = file.name;
      this.tmp_files[0] = (event.target.files[0]);
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

      if (this.data.action === 'file') {

        const formdata = new FormData();
        formdata.append('FolderId', this.data.folder.folderId.toString());
        formdata.append('FileId', this.data.folder.fileId.toString());
        formdata.append('File', this.tmp_files[0]);
        formdata.append('modifiedBy', this.user.id);

        this._directoryService.UpdateFile(formdata).subscribe({
          next: () => {

            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Archivo remplazado.';
            this.dialogRef.close(this.ResponseMessage);

          },
          error: (err: any) => {
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = "Intento Nuevamente.";
            this.dialogRef.close(this.ResponseMessage);
          }
        });
      } else {


        if (this.tmp_files[0] != undefined) {
          const formdata = new FormData();
          formdata.append('FolderId', this.data.folder.folderId.toString());
          formdata.append('File', this.tmp_files[0]);
          formdata.append('createdBy', this.user.id);


          this._directoryService.addFile(formdata).subscribe({
            next: () => {

              this.ResponseMessage.CodError = 200;
              this.ResponseMessage.Message = 'Archivo cargado.';
              this.dialogRef.close(this.ResponseMessage);

            },
            error: (err: any) => {
              this.ResponseMessage.CodError = 500;
              this.ResponseMessage.Message = "Intento Nuevamente.";
              this.dialogRef.close(this.ResponseMessage);
            }
          });

        }
      }

    }
  }
}




