import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject,OnInit  } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/service/auth.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { PettyCash } from 'app/treasury/Models/PettyCash';
import { PettyCashService } from 'app/treasury/Services/petty-cash.service';


export interface DialogData {
  id: string;
  action: string;
  pettyCash: PettyCash;
}
@Component({
  selector: 'app-add-petty-cash',
  templateUrl: './add-petty-cash.component.html',
  styleUrls: ['./add-petty-cash.component.scss']
})
export class AddPettyCashComponent  implements OnInit{

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public pettyCashForm!: UntypedFormGroup;
  public pettyCash: PettyCash = {
    createdBy: this.authService.currentUserValue.id,
    cajaMenudaId: 0,
    periodoContableId: 0,
    concepto: '',
    monto: 0,
    balance: 0,
    ultimoGasto: 0,
    ultimoIngreso: 0,
    tipoTransaccion: '',
    createdDate: ''
  }
  periodoId: number=0;
  constructor(
    public dialogRef: MatDialogRef<AddPettyCashComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public pettyCashService: PettyCashService,
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar caja menuda";
      this.pettyCash = data.pettyCash;
    } else {
      this.dialogTitle = 'Nueva caja menuda';
    }
  
    
  }
  
  ngOnInit() {
    this.loadPeriodoContable();
    this.pettyCashForm = this.createContactForm();
  }

  loadPeriodoContable() {
    this.pettyCashService.getPeriodo().subscribe({
      next: (data) => {
        this.periodoId = data["getPeriodContables"][0].periodoId;
        this.pettyCashForm = this.createContactForm();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      periodoContableId: [this.periodoId], 
      cajaMenudaId:[this.pettyCash.cajaMenudaId, Validators.required],
      concepto: [this.pettyCash.concepto, Validators.required],
      monto: [this.pettyCash.monto, Validators.required],
      tipoTransaccion: [this.pettyCash.tipoTransaccion, Validators.required],
      createdBy: [this.authService.currentUserValue.id, Validators.required],
      lastModifiedBy:[this.authService.currentUserValue.id, Validators.required],
      
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
      this.pettyCashService.updatePettyCashMode(this.pettyCashForm.getRawValue())
        .subscribe({
          next: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
        });

    } else {
      this.pettyCashService.addPettyCashMode(this.pettyCashForm.getRawValue())
        .subscribe({
          next: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Creado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    }
  }


}


