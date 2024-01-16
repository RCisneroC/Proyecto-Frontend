import { Component, Inject } from '@angular/core';
import { DataModal, ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivityLocationService } from '../services/activity-location.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LocationActivity } from 'app/admission/models/LocationActivity';

export interface DialogData {
  id: string;
  action: string;
  locationActivity : LocationActivity;
}

@Component({
  selector: 'app-activity-ubication-form',
  templateUrl: './activity-ubication-form.component.html',
  styleUrls: ['./activity-ubication-form.component.scss']
})
export class ActivityUbicationFormComponent {

public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
  public action: string;
  public dialogTitle: string;
  public locationActivityForm: UntypedFormGroup;
  public locationActivity: LocationActivity = {
    id: 0,
    description: '',
    name: '',
    statusId:1
  }
  constructor(
    public dialogRef: MatDialogRef<ActivityUbicationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public acitivityLocationService: ActivityLocationService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle ="Editar Ubicación de actividad";
      this.locationActivity = data.locationActivity;
    } else {
      this.dialogTitle = 'Nueva Ubicación de actividad';
    }
    this.locationActivityForm = this.createContactForm();
  }


    createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.locationActivity.id],
      name: [this.locationActivity.name, [Validators.required]],
      description: [this.locationActivity.description],
      statusId: [this.locationActivity.statusId, [Validators.required]],
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
      this.acitivityLocationService.updateLocationActivity(this.locationActivityForm.getRawValue())
        .subscribe({
          next: (res:ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
           this.dialogRef.close(this.ResponseMessage);
          },
          error: (err:any) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = err;
            this.dialogRef.close(this.ResponseMessage);
          }
      });
          
    } else {
      this.acitivityLocationService.addLocationActivity(this.locationActivityForm.getRawValue())
      .subscribe({
          next: (res:ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Creado correctamente.';
           this.dialogRef.close(this.ResponseMessage);
          },
          error: (err:any) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = err;
            this.dialogRef.close(this.ResponseMessage);
          }
      });
    }
  }
}
