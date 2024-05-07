import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../models/Category';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CategoryServiceForoService } from '../../services/category-service-foro.service';
import { ResponseMessageMaestra } from '../../../admission/models/ResponseMessage';
import { HttpErrorResponse } from '@angular/common/http';

export interface DialogData {
  categoria: Category;
  accion: string;
}

@Component({
  selector: 'app-category-forms-foro',
  templateUrl: './category-forms-foro.component.html',
  styleUrls: ['./category-forms-foro.component.scss']
})
export class CategoryFormsForoComponent {

  action: string;
  dialogTitle: string = '';
  FormsCategory: UntypedFormGroup;
  id_actividad: string = '';
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  constructor(
    public dialogRef: MatDialogRef<CategoryFormsForoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public _dialog: MatDialog,
    public _servideCategoryJobs: CategoryServiceForoService
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
      categoryId: [data.categoria.categorieId, [Validators.required]],
      categoryName: [data.categoria.name],
      categoryDescription: [data.categoria.descripion, [Validators.required]],
      modifiedBy: [data.categoria.createdBy, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  confirmAdd() {

    if (this.action === 'add-category') {
      this._servideCategoryJobs.addCategory(this.FormsCategory.getRawValue()).subscribe({
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
      this._servideCategoryJobs.updateCategory(this.FormsCategory.getRawValue()).subscribe({
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
