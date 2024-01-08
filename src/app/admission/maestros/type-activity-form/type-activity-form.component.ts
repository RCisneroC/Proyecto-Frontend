import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { TypeActivity } from 'app/admission/models/type-activity';
import { TypeActivityService } from '../services/type-activity.service';
export interface DialogData {
id: string;
action: string;
typeActivity : TypeActivity;
}
@Component({
  selector: 'app-type-activity-form',
  templateUrl: './type-activity-form.component.html',
  styleUrls: ['./type-activity-form.component.scss']
})
export class TypeActivityFormComponent {
 public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
  public action: string;
  public dialogTitle: string;
  public typeActivityForm: UntypedFormGroup;
  public typeActivityData: TypeActivity = {
    id: 0,
    name: '',
    statusId:1
  }
  constructor(
    public dialogRef: MatDialogRef<TypeActivityFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public typeActivity: TypeActivityService,
    private fb: UntypedFormBuilder
  ) {

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle ="Editar Tipo de actividad";
      this.typeActivityData = data.typeActivity;
    } else {
      this.dialogTitle = 'Nueva Tipo de actividad';
    }
    this.typeActivityForm = this.createContactForm();
  }

      createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.typeActivityData.id],
      name: [this.typeActivityData.name, [Validators.required]],
      statusId: [this.typeActivityData.statusId, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
      public confirmAdd(): void {
    if  (this.action==='edit'){
      this.typeActivity.updateTypeActivity(this.typeActivityForm.getRawValue())
        .subscribe({
          next: (res:ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
           this.dialogRef.close(this.ResponseMessage);
          },
          error: (err:any) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
      });
          
    } else {
      this.typeActivity.addTypeActivity(this.typeActivityForm.getRawValue())
      .subscribe({
          next: (res:ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Creado correctamente.';
           this.dialogRef.close(this.ResponseMessage);
          },
          error: (err:any) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
      });
    }
  }

}
