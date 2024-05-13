import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/service/auth.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { AssignmentPeriod } from 'app/treasury/Models/AssignmentPeriod';
import { AssetLocationService } from 'app/treasury/Services/asset-location.service';
import { AssignmentPeriodService } from 'app/treasury/Services/assignment-period.service';


export interface DialogData {
  id: string;
  action: string;
  assignmentPeriod: AssignmentPeriod;
}
@Component({
  selector: 'app-add-assignment-period',
  templateUrl: './add-assignment-period.component.html',
  styleUrls: ['./add-assignment-period.component.scss']
})
export class AddAssignmentPeriodComponent  implements OnInit{

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public assignmentPeriodForm!: UntypedFormGroup;
  public assignmentPeriod: AssignmentPeriod = {
    createdBy: this.authService.currentUserValue.id,
    periodoAsignacionid: 0,
    asignacionBienActivosFijosId: 0,
    temporal: false,
    permanente: false,
    recibe: '',
    cargo: '',
    nombre: '',
    firma: false,
    firmaJefe: false,
    nombreJefe: '',
    cargoJefe: '',
    validadoPor: '',
    statusIdValidadoPor: '',
    revisadoPor: '',
    statusIdRevisadoPor: '',
    aprobadoPor: '',
    statusId: 0
  }
  periodoId: number=0;
  bienes!: any;
  constructor(
    public dialogRef: MatDialogRef<AddAssignmentPeriodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public assignmentPeriodService: AssignmentPeriodService,
    public assetLocationService: AssetLocationService,
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar periodo de asignacion";
      this.assignmentPeriod = data.assignmentPeriod;
    } else {
      this.dialogTitle = 'Nuevo periodo de asignacion';
    }
  
    
  }
  
  ngOnInit() {
   // this.loadPeriodoContable();
    this.loadAssetLocation();
    this.assignmentPeriodForm = this.createContactForm();
  }

  loadPeriodoContable() {
    this.assignmentPeriodService.getPeriodo().subscribe({
      next: (data) => {
        this.periodoId = data["getPeriodContables"][0].periodoId;
        this.assignmentPeriodForm = this.createContactForm();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
  
  loadAssetLocation() {
    this.assetLocationService.getAllAssetLocation3().subscribe({
      next: (data) => {
        this.bienes = data["getAsignacionBiens"];
       
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      periodoAsignacionid: [this.assignmentPeriod.periodoAsignacionid, Validators.required],
      asignacionBienActivosFijosId: [this.assignmentPeriod.asignacionBienActivosFijosId, Validators.required],
      temporal: [this.assignmentPeriod.temporal],
      permanente: [this.assignmentPeriod.permanente],
      recibe: [this.assignmentPeriod.recibe, Validators.required],
      cargo: [this.assignmentPeriod.cargo, Validators.required],
      nombre: [this.assignmentPeriod.nombre, Validators.required],
      firma: [this.assignmentPeriod.firma],
      firmaJefe: [this.assignmentPeriod.firmaJefe],
      nombreJefe: [this.assignmentPeriod.nombreJefe, Validators.required],
      cargoJefe: [this.assignmentPeriod.cargoJefe, Validators.required],
      validadoPor: [this.assignmentPeriod.validadoPor],
      statusIdValidadoPor: [this.assignmentPeriod.statusIdValidadoPor],
      revisadoPor: [this.assignmentPeriod.revisadoPor],
      statusIdRevisadoPor: [this.assignmentPeriod.statusIdRevisadoPor],
      aprobadoPor: [this.assignmentPeriod.aprobadoPor],
      statusId: [4],
      createdBy: [this.authService.currentUserValue.id, Validators.required],
      modifiedBy:[this.authService.currentUserValue.id, Validators.required],
      
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
      this.assignmentPeriodService.updateAssignmentPeriodMode(this.assignmentPeriodForm.getRawValue())
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
      this.assignmentPeriodService.addAssignmentPeriodMode(this.assignmentPeriodForm.getRawValue())
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



