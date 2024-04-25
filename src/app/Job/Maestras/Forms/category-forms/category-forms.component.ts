import { CategoryJobs } from './../../../Interfaces/CategoryJobs';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CategoryJobServiceService } from 'app/Job/Services/category-job-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';

export interface DialogData {
  categoria: CategoryJobs;
  accion: string;
}
@Component({
  selector: 'app-category-forms',
  templateUrl: './category-forms.component.html',
  styleUrls: ['./category-forms.component.scss']
})
export class CategoryFormsComponent {
  action: string;
  dialogTitle: string = '';
  FormsCategory: UntypedFormGroup;
  id_actividad: string = '';
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  constructor(
    public dialogRef: MatDialogRef<CategoryFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public _dialog: MatDialog,
    public _servideCategoryJobs: CategoryJobServiceService
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);

    if (this.action === 'add-category') {
      this.dialogTitle = "Agregar Categoría";
    } else if (this.action === 'edit-category') {
      this.dialogTitle = "Editar Categoría";
    }
    this.FormsCategory = this.fb.group({
      statusId: [data.categoria.statusId, [Validators.required]],
      id: [data.categoria.id],
      name: [data.categoria.name, [Validators.required]],
      description: [data.categoria.description, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  confirmAdd() {

    if (this.action === 'add-category') {
      this._servideCategoryJobs.addCategoryJobs(this.FormsCategory.getRawValue()).subscribe({
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
    } else if (this.action === 'edit-category') {
      this._servideCategoryJobs.updateCategoryJobs(this.FormsCategory.getRawValue()).subscribe({
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
  onNoClick() {
    this.dialogRef.close();
  }
}
