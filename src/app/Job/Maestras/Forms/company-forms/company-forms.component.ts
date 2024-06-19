import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { CompanyJobs } from 'app/Job/Interfaces/Company-jobs';
import { CompanyJobServiceService } from 'app/Job/Services/company-job-service.service';
export interface DialogData {
  id: string;
  accion: string;
  company: CompanyJobs;
}
@Component({
  selector: 'app-company-forms',
  templateUrl: './company-forms.component.html',
  styleUrls: ['./company-forms.component.scss']
})
export class CompanyFormsComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public CompanyForms: UntypedFormGroup;
  public company: CompanyJobs = {
    statusId: 0,
    id: 0,
    name: '',
    description: '',
    contactPersonFullName: '',
    email: '',
    logo: '',
    phone: ''
  }
  constructor(
    public dialogRef: MatDialogRef<CompanyFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _CompanyJobServiceService: CompanyJobServiceService,
    private fb: UntypedFormBuilder
  ) {
    this.company = data.company;
    this.action = data.accion;
    if (this.action === 'edit-company') {
      this.dialogTitle = "Editar entidad";
    } else {
      this.dialogTitle = 'Nueva entidad';
    }
    this.CompanyForms = this.createContactForm();
  }


  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      Name: [this.data.company.name, [Validators.required]],
      Logo: [this.data.company.logo, [Validators.required]],
      Description: [this.data.company.description, [Validators.required]],
      Email: [this.data.company.email, [Validators.required]],
      Phone: [this.data.company.phone, [Validators.required]],
      Id: [this.data.company.id],
      StatusId: [this.data.company.statusId, [Validators.required]],
      ContactPersonFullName: [this.data.company.contactPersonFullName, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.log(this.CompanyForms.getRawValue());
    var formData = new FormData();
    formData.append('Name', this.CompanyForms.controls['Name'].value);
    formData.append('Logo', this.CompanyForms.controls['Logo'].value);
    formData.append('Description', this.CompanyForms.controls['Description'].value);
    formData.append('Email', this.CompanyForms.controls['Email'].value);
    formData.append('Phone', this.CompanyForms.controls['Phone'].value);
    formData.append('Id', this.CompanyForms.controls['Id'].value);
    formData.append('StatusId', this.CompanyForms.controls['StatusId'].value);
    formData.append('ContactPersonFullName', this.CompanyForms.controls['ContactPersonFullName'].value);
    console.log(this.action);

    if (this.action === 'edit-company') {
      this._CompanyJobServiceService.updateCompanyJobs(formData)
        .subscribe({
          next: (res: ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err: HttpErrorResponse) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = err.error.Message;
            this.dialogRef.close(this.ResponseMessage);
          }
        });

    } else {
      this._CompanyJobServiceService.addCompanyJobs(formData)
        .subscribe({
          next: (res: ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Creado correctamente.';
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
