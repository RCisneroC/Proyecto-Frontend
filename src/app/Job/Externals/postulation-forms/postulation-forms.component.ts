import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Jobs } from 'app/Job/Interfaces/Jobs';
import { JobServiceService } from 'app/Job/Services/job-service.service';
export interface DialogData {
  Jobs: Jobs;
  userEmail: string;
  userName: string;
  accion: string;
}
@Component({
  selector: 'app-postulation-forms',
  templateUrl: './postulation-forms.component.html',
  styleUrls: ['./postulation-forms.component.scss']
})
export class PostulationFormsComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string = '';
  public dialogTitle: string = '';
  public JobsDetailsForms: UntypedFormGroup;
  public jobsDetails: Jobs = {
    statusId: 0,
    id: 0,
    name: '',
    description: '',
    endDate:new Date,
    startDate:new Date,
    categoryId: 0,
    categoryName: '',
    companyId: 0,
    companyName: '',
    companyProvinceId: 0,
    companyProvinceName: '',
    companyAddressId: 0,
    companyAddress: '',
    contractTypeId: 0,
    contractTypeName: '',
    companyContactPersonFullName: '',
    companyEmail: '',
    numOfYearsOfExperienceRequired: ''
  }
  constructor(
    public dialogRef: MatDialogRef<PostulationFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _JobServiceService: JobServiceService,
    private fb: UntypedFormBuilder
  ) {
    this.jobsDetails = data.Jobs;
    this.action = data.accion;
    if (this.action === 'postularme') {
      this.dialogTitle = "Nueva Postulación";
    }
    this.JobsDetailsForms = this.createContactForm();
  }


  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      ApplicantFullName: [this.data.userName, [Validators.required]],
      ApplicantEmail: [this.data.userEmail, [Validators.required]],
      CV: ['', [Validators.required]],
      Commentary: ['', [Validators.required]],
      JobId: [this.data.Jobs.id, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.log(this.JobsDetailsForms.getRawValue());
    var formData = new FormData();
    formData.append('ApplicantFullName', this.JobsDetailsForms.controls['ApplicantFullName'].value);
    formData.append('ApplicantEmail', this.JobsDetailsForms.controls['ApplicantEmail'].value);
    formData.append('CV', this.JobsDetailsForms.controls['CV'].value);
    formData.append('Commentary', this.JobsDetailsForms.controls['Commentary'].value);
    formData.append('JobId', this.JobsDetailsForms.controls['JobId'].value);
    console.log(this.action);

    if (this.action === 'postularme') {
      this._JobServiceService.addPostulacion(formData)
        .subscribe({
          next: (res: ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Postulado Correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err: HttpErrorResponse) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = err.error.Message;
            this.dialogRef.close(this.ResponseMessage);
          }
        });

    }
  }
}
