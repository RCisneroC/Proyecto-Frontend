import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { CooperationgOrganizationService } from '../services/cooperationg-organization.service';
import { Cooperating } from 'app/admission/models/Cooperating';
export interface DialogData {
  id: string;
  action: string;
  cooperating: Cooperating;
}
@Component({
  selector: 'app-form-cooperating-organization',
  templateUrl: './form-cooperating-organization.component.html',
  styleUrls: ['./form-cooperating-organization.component.scss']
})
export class FormCooperatingOrganizationComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public cooperativeForm: UntypedFormGroup;
  public cooperative: Cooperating = {
    id: 0,
    description: '',
    name: '',
    statusId: 1,
    logo: '',
  }
  constructor(
    public dialogRef: MatDialogRef<FormCooperatingOrganizationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _CooperationgOrganizationService: CooperationgOrganizationService,
    private fb: UntypedFormBuilder
  ) {
    this.cooperative = data.cooperating;
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar organización cooperativa";
      this.cooperativeForm = this.fb.group({
        id: [this.data.cooperating.id],
        name: [this.cooperative.name, [Validators.required]],
        description: [this.cooperative.description],
        logo: [this.cooperative.logo],
        statusId: [this.cooperative.statusId, [Validators.required]],
      });

    } else {
      this.dialogTitle = 'Nueva organización cooperativa';
      this.cooperativeForm = this.fb.group({
        id: [this.data.cooperating.id],
        name: [this.cooperative.name, [Validators.required]],
        description: [this.cooperative.description],
        logo: [this.cooperative.logo, [Validators.required]],
        statusId: [this.cooperative.statusId, [Validators.required]],
      });
    }
    // this.cooperativeForm = this.createContactForm();
  }


  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.data.cooperating.id],
      name: [this.cooperative.name, [Validators.required]],
      description: [this.cooperative.description],
      logo: [this.cooperative.logo, [Validators.required]],
      statusId: [this.cooperative.statusId, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.log(this.cooperativeForm.getRawValue());
    var formData = new FormData();
    formData.append('Name', this.cooperativeForm.controls['name'].value);
    formData.append('Logo', this.cooperativeForm.controls['logo'].value);
    formData.append('Description', this.cooperativeForm.controls['description'].value);
    formData.append('Id', this.cooperativeForm.controls['id'].value);
    formData.append('StatusId', this.cooperativeForm.controls['statusId'].value);
    if (this.action === 'edit') {
      this._CooperationgOrganizationService.updateCooperating(formData)
        .subscribe({
          next: (res: ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err: any) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = err;
            this.dialogRef.close(this.ResponseMessage);
          }
        });

    } else {
      this._CooperationgOrganizationService.addCooperating(formData)
        .subscribe({
          next: (res: ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Creado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err: any) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = err;
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    }
  }
}
