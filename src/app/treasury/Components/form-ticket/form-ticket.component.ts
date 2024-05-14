import { Component, Inject, OnInit,OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/service/auth.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Tickets } from 'app/treasury/Models/GetTicketResponse';
import { TicketService } from 'app/treasury/Services/ticket.service';
import { GetPeriodContable } from 'app/treasury/Models/AccountPeriodResponse';
import { AccountPeriodService } from 'app/treasury/Services/account-period.service';
import { BudgetSubCondificationCatalogService } from 'app/treasury/Services/budget-sub-condification-catalog.service';
import { ListCategory } from 'app/treasury/Models/Categories';
import { Subcategoria } from 'app/treasury/Models/GetCategoriesAndSubResponse';
import Swal from 'sweetalert2';

export interface DialogData {
  detail: Tickets;
}

@Component({
  selector: 'app-form-ticket',
  templateUrl: './form-ticket.component.html',
  styleUrls: ['./form-ticket.component.scss']
})
export class FormTicketComponent implements OnInit,OnDestroy {

  public subscriptions: Subscription[] = [];
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string = "";
  public form: UntypedFormGroup;
  IsLoading: boolean = false;
  ticket : Tickets = {};
  public periodos: GetPeriodContable[] = [];
  public codes: ListCategory[] = [];
  public subcodes: Subcategoria[] = [];
  public _File: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviceTicketService: TicketService,
    private authService: AuthService,
    private fb: UntypedFormBuilder,
    private  serviceAccountPeriodService:AccountPeriodService,
    private serviceBudgetSubCondificationCatalogService:BudgetSubCondificationCatalogService
  ) {
    this.action = data.detail.actions!;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar Boleta";
      this.ticket = data.detail;
    } else if (this.action === 'new') {
      this.dialogTitle = 'Nueva Boleta';
    }
    this.form = this.createForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  ngOnInit(): void {
    if(this.action == "new"){
      this.loadPeriods();
      this.loadCode();
    }
  }

  createForm(): UntypedFormGroup {
    let periodoContableId:number = 0;
    let statusId:number = 0;

    if(this.action == "new"){
      this.ticket.statusId = 1;
    }
    if(this.action == "edit"){
      periodoContableId = 1;
      statusId = 1;
    }

    return this.fb.group({
      NumeroBoleta: [this.ticket.numeroBoleta!, [Validators.required]],
      Descripcion: [this.ticket.descripcion!, [Validators.required]],
      Monto: [this.ticket.monto, [Validators.required,
        Validators.pattern(/^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$/)]],
      statusId: [this.ticket.statusId, [Validators.required]],
      PeriodoContableId: [periodoContableId, [Validators.required]],
      Code: [''],
      SubCode: [''],
      File: [],
      StatusId : [statusId, [Validators.required]],
    });
  }


  loadPeriods():void{
    this.periodos = [];
    this.subscriptions.push(
      this.serviceAccountPeriodService.getAll().subscribe({
        next : (request)=>{
                 const  r = request.getPeriodContables;
                 r.forEach(
                  (p)=>{
                    this.periodos.push(
                      {
                        periodoId: p.periodoId,
                        fechaInicio: p.fechaInicio,
                        fechaFin: p.fechaFin,
                        descripcion: p.descripción,
                        statusId: p.statusId,
                        createdBy: p.createdBy,
                        createdDate: p.createdDate
                      }
                    )
                  }
                 );
        },
        error : (err:HttpErrorResponse) =>{
          console.log(err);
        }
       })
    );
  }



loadCode():void{
    this.subscriptions.push(
      this.serviceBudgetSubCondificationCatalogService.getCategory().subscribe({
        next : (request)=>{
                this.codes = request.categorias;
        },
        error : (err:HttpErrorResponse) =>{
          console.log(err);
        }
       })
    );
  }



loadSubcode(categoryId:number):void{
  this.subcodes = [];
  this.subscriptions.push(
    this.serviceBudgetSubCondificationCatalogService.getCategoryAndSubCategoryById(categoryId).subscribe({
      next : (request)=>{
              this.subcodes = request.categoriasResult[0].subcategorias;
      },
      error : (err:HttpErrorResponse) =>{
        console.log(err);
      }
     })
  );
}


confirmAdd() {
  if (!this.form.valid) {
    return;
  }
  this.IsLoading = true;
  if (this.action == "new") {
    const formData = new FormData();
    formData.append('NumeroBoleta', this.form.controls['NumeroBoleta'].value);
    formData.append('Descripcion', this.form.controls['Descripcion'].value);
    formData.append('Monto', this.form.controls['Monto'].value);
    this._File.forEach((file) => {
      formData.append('File', file);
    });
    formData.append('Code', this.form.controls['Code'].value);
    formData.append('SubCode', this.form.controls['SubCode'].value);
    formData.append('PeriodoContableId', this.form.controls['PeriodoContableId'].value);
    formData.append('CreatedBy', this.authService.currentUserValue.id);

    this.subscriptions.push(
      this.serviceTicketService.save(formData).subscribe(
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
    const formData = new FormData();
    formData.append('BoletaId', this.ticket.boletaId!.toString());
    formData.append('NumeroBoleta', this.form.controls['NumeroBoleta'].value);
    formData.append('Descripcion', this.form.controls['Descripcion'].value);
    formData.append('Monto', this.form.controls['Monto'].value);
    this._File.forEach((file) => {
      formData.append('File', file);
    });
    formData.append('StatusId', this.form.controls['StatusId'].value);
    formData.append('ModifiedBy', this.authService.currentUserValue.id);

    this.subscriptions.push(
      this.serviceTicketService.update(formData).subscribe(
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


onChangeFile(event: any) {
  const files: FileList = event.target.files;

  if(files[0].type != "application/pdf"){
  Swal.fire({
    title: "Escuela Judicial",
    text: 'El boleta no tiene un formato válido.',
    icon: "warning"
  });
  return;
 }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    this._File.push(file);
  }
  Swal.fire({
    title: "Escuela Judicial",
    text: 'Archivos Cargados, Guardar la tarea para confirmar.',
    icon: "success"
  });
}


}
