import { Component, Inject } from '@angular/core';
import { DataModal, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivityLocationService } from '../services/activity-location.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { LocationActivity } from 'app/admission/models/LocationActivity';

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
  public locationActivity: LocationActivity;
  constructor(
    public MatDialogRef: MatDialogRef<ActivityUbicationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataModal,
    public acitivityLocationService: ActivityLocationService,
    private fb: UntypedFormBuilder
  ) {

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle ="Editar Ubicación de actividad";
      this.locationActivity = data.data;
    } else {
      this.dialogTitle = 'Nueva Ubicación de actividad';
    }
    // this.loungeForm = this.createContactForm();
  }
}
