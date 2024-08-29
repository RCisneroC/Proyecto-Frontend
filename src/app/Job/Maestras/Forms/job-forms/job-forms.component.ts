import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { CategoryJobs } from 'app/Job/Interfaces/CategoryJobs';
import { CompanyJobs, UbicationsJobs } from 'app/Job/Interfaces/Company-jobs';
import { Jobs } from 'app/Job/Interfaces/Jobs';
import { TypeContractJobs } from 'app/Job/Interfaces/Type-contract-jobs';
import { JobServiceService } from 'app/Job/Services/job-service.service';
import { UbicationsServicesService } from 'app/Job/Services/ubications-services.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
export interface DialogData {
  Jobs: Jobs;
  Categoty: CategoryJobs[];
  Company: CompanyJobs[];
  ContractType: TypeContractJobs[];
  accion: string;
}
@Component({
  selector: 'app-job-forms',
  templateUrl: './job-forms.component.html',
  styleUrls: ['./job-forms.component.scss']
})
export class JobFormsComponent {
  action: string;
  dialogTitle: string = '';
  public Editor: any = ClassicEditor;
  FormsJobs: UntypedFormGroup;
  _UbicationsJobs: UbicationsJobs[] = [
    this._UbicationsServicesService._UbicationsJobs
  ]
  id_actividad: string = '';
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public config = {
    licenseKey: 'a004N2VuYWZNOHdLMUxGNFpDVzcrMitERUNEKzlKdWZZbmtOQ3RJZ0xKc3NwMlFMNG4yOWliTkE2bFI0LU1qQXlOREF6TVRJPQ==',
    language: 'es',
    toolbar: ['undo', 'redo', 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed'],
  }
  constructor(
    public dialogRef: MatDialogRef<JobFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public _dialog: MatDialog,
    public _JobServiceService: JobServiceService,
    public _UbicationsServicesService: UbicationsServicesService
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);

    if (this.action === 'add-jobs') {
      this.dialogTitle = "Agregar Empleo";
    } else if (this.action === 'edit-jobs') {
      this.dialogTitle = "Editar Empleo";
      console.log('====================================');
      console.log(data.Jobs);
      console.log('====================================');
      this.buscar(data.Jobs.companyId);
    }
    this.FormsJobs = this.fb.group({
      statusId: [data.Jobs.statusId, [Validators.required]],
      id: [data.Jobs.id],
      name: [data.Jobs.name, [Validators.required]],
      description: [data.Jobs.description, [Validators.required]],
      categoryId: [data.Jobs.categoryId, [Validators.required]],
      companyId: [data.Jobs.companyId, [Validators.required]],
      startDate:[data.Jobs.startDate, [Validators.required]],
      endDate:[data.Jobs.endDate, [Validators.required]],
      companyAddressId: [data.Jobs.companyAddressId, [Validators.required]],
      contractTypeId: [data.Jobs.contractTypeId, [Validators.required]],
      numOfYearsOfExperienceRequired: [data.Jobs.numOfYearsOfExperienceRequired],
    });
  }
  submit() {
    // emppty stuff
  }
  confirmAdd() {

    if (this.action === 'add-jobs') {
      this._JobServiceService.addJobs(this.FormsJobs.getRawValue()).subscribe({
        next: (res) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = res.message;
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: HttpErrorResponse) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = err.error.Message;
          this.dialogRef.close(this.ResponseMessage);
        },
        complete: () => {
        }
      })
    } else if (this.action === 'edit-jobs') {
      this._JobServiceService.updateJobs(this.FormsJobs.getRawValue()).subscribe({
        next: (res) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = res.message;
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: HttpErrorResponse) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = err.error.Message;
          this.dialogRef.close(this.ResponseMessage);
        },
        complete: () => {
        }
      })
    }


  }

  buscar(event: any) {
    console.log('====================================');
    console.log(event);
    console.log('====================================');
    this._UbicationsServicesService.getUbications(event).subscribe({
      next: (res) => {
        this._UbicationsJobs = res;

      }
    })
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
