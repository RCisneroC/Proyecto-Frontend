import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Modality } from 'app/admission/models/modality';
import { ModalityService } from '../services/modality.service';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  id: string;
  action: string;
  modality: Modality;
}

@Component({
  selector: 'app-modality-form',
  templateUrl: './modality-form.component.html',
  styleUrls: ['./modality-form.component.scss']
})
export class ModalityFormComponent {

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public modalityForm: UntypedFormGroup;
  public modality: Modality = {
    id: 0,
    name: '',
    statusId: 1
  }
  constructor(
    public dialogRef: MatDialogRef<ModalityFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public modalityService: ModalityService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar Modalidad de actividad";
      this.modality = data.modality;
    } else {
      this.dialogTitle = 'Nueva Modalidad de actividad';
    }
    this.modalityForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.modality.id],
      name: [this.modality.name, [Validators.required]],
      statusId: [this.modality.statusId, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.action === 'edit') {
      this.modalityService.updateActivityMode(this.modalityForm.getRawValue())
        .subscribe({
          next: (res: ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err: any) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
        });

    } else {
      this.modalityService.addActivityMode(this.modalityForm.getRawValue())
        .subscribe({
          next: (res: ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Creado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err: any) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    }
  }


}
