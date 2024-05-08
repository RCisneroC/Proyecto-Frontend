import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Subcategoria } from 'app/treasury/Models/ListBudgetSubCodificationCatalog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/service/auth.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { BudgetSubCondificationCatalogService } from 'app/treasury/Services/budget-sub-condification-catalog.service';
import { ListCategory } from 'app/treasury/Models/Categories';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

export interface DialogData {
  detail: Subcategoria;
}

@Component({
  selector: 'app-form-budget-sub-codification-catalog',
  templateUrl: './form-budget-sub-codification-catalog.component.html',
  styleUrls: ['./form-budget-sub-codification-catalog.component.scss']
})
export class FormBudgetSubCodificationCatalogComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string = "";
  public form: UntypedFormGroup;
  subcategoria: Subcategoria = {};
  public categorias: ListCategory[] = [];
  IsLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FormBudgetSubCodificationCatalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviceBudgetSubCondificationCatalog: BudgetSubCondificationCatalogService,
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.detail.actions!;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar Subcodificación Presupuestaria";
      this.subcategoria = data.detail;
    } else if (this.action === 'new') {
      this.dialogTitle = 'Nueva Subcodificación Presupuestaria';
    }
    this.form = this.createForm();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  ngOnInit(): void {
    this.loadCategory();
  }

  createForm(): UntypedFormGroup {
    if (this.action == "new") {
      this.subcategoria.statusId = 1;
    }
    return this.fb.group({
      codigoSubcategoria: [this.subcategoria.codigoSubcategoria, [Validators.required]],
      statusId: [this.subcategoria.statusId, [Validators.required]],
      descripcion: [this.subcategoria.descripcion, [Validators.required]],
      categoriaId: [this.subcategoria.categoriaId, [Validators.required]],
      modifiedBy: [this.authService.currentUserValue.id],
      createdBy: [this.authService.currentUserValue.id],
    });
  }

  loadCategory() {
    this.subscriptions.push(
      this.serviceBudgetSubCondificationCatalog.getCategory().subscribe(
        {
          next: (data) => {
            this.categorias = data.categorias;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        }
      )
    );
  }

  confirmAdd() {
    if (!this.form.valid) {
      return;
    }
    this.IsLoading = true;
    if (this.action == "new") {

      const data = {
        codigoSubcategoria: parseInt(this.form.value.codigoSubcategoria),
        descripcion: this.form.value.descripcion,
        createdBy: this.form.value.createdBy,
        categoriaId: parseInt(this.form.value.categoriaId)
      }
      this.subscriptions.push(
        this.serviceBudgetSubCondificationCatalog.save(data).subscribe(
          {
            next: (data) => {
              if (data.statusCode == 200) {
                this.ResponseMessage.CodError = 200;
                this.ResponseMessage.Message = 'Guardado correctamente.';
                this.IsLoading = false;
                this.dialogRef.close(this.ResponseMessage);

              }
              else {
                this.ResponseMessage.CodError = 400;
                this.ResponseMessage.Message = 'Intente nuevamente.';
                this.IsLoading = false;
                this.dialogRef.close(this.ResponseMessage);
              }

            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
              this.ResponseMessage.CodError = 400;
              this.ResponseMessage.Message = 'Intente nuevamente.';
              this.IsLoading = false;
              this.dialogRef.close(this.ResponseMessage);
            }
          }
        )
      );
    }
    else if (this.action == "edit") {

      const data = {
        subCategoriesId: this.subcategoria.subCategoriaId!,
        codigoSubcategoria: this.subcategoria.codigoSubcategoria!,
        descripcion: this.form.value.descripcion,
        modifiedBy: this.form.value.modifiedBy,
        categoriaId: parseInt(this.form.value.categoriaId),
        statusId: parseInt(this.form.value.statusId)
      }
      this.subscriptions.push(
        this.serviceBudgetSubCondificationCatalog.update(data).subscribe(
          {
            next: (data) => {
              if (data.statusCode == 200) {
                this.ResponseMessage.CodError = 200;
                this.ResponseMessage.Message = 'Editado correctamente.';
                this.dialogRef.close(this.ResponseMessage);
              }
              else {
                this.ResponseMessage.CodError = 400;
                this.ResponseMessage.Message = 'Intente nuevamente.';
                this.dialogRef.close(this.ResponseMessage);
              }

            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
              this.ResponseMessage.CodError = 400;
              this.ResponseMessage.Message = 'Intente nuevamente.';
              this.dialogRef.close(this.ResponseMessage);
            }
          }
        )
      );

    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
