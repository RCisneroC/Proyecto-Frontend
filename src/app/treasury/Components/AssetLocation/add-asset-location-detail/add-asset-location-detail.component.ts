import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/service/auth.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { AssetLocationDetail } from 'app/treasury/Models/AssetLocation';
import { AssetLocationService } from 'app/treasury/Services/asset-location.service';

export interface DialogData {
  id: string;
  action: string;
  assetLocationDetail: AssetLocationDetail;
}
@Component({
  selector: 'app-add-asset-location-detail',
  templateUrl: './add-asset-location-detail.component.html',
  styleUrls: ['./add-asset-location-detail.component.scss']
})
export class AddAssetLocationDetailComponent implements OnInit{

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public assetLocationDetailForm!: UntypedFormGroup;
  public assetLocationDetail: AssetLocationDetail = {
    createdBy: this.authService.currentUserValue.id,

    createdDate: '',
    id: 0,
    asignacionBienActivosFijosId: 0,
    numero: 0,
    placa: '',
    descripcion: '',
    marca: '',
    modelo: '',
    serie: '',
    estadoFisico: '',
    observaciones: ''
  }
  periodoId: number=0;
  constructor(
    public dialogRef: MatDialogRef<AddAssetLocationDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public assetLocationService: AssetLocationService,
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar detalle";
      this.assetLocationDetail = data.assetLocationDetail;
    } else {
      this.dialogTitle = 'Nueva detalle';
    }
  
    
  }
  
  ngOnInit() {

    this.assetLocationDetailForm = this.createContactForm();
  }

 
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      // periodoContableId: [this.periodoId], 
      // cajaMenudaId:[this.pettyCash.cajaMenudaId, Validators.required],
      // concepto: [this.pettyCash.concepto, Validators.required],
      // monto: [this.pettyCash.monto, Validators.required],
      // tipoTransaccion: [this.pettyCash.tipoTransaccion, Validators.required],
      // createdBy: [this.authService.currentUserValue.id, Validators.required],
      // lastModifiedBy:[this.authService.currentUserValue.id, Validators.required],
      
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
      this.assetLocationService.updateAssetLocationDetailMode(this.assetLocationDetailForm.getRawValue())
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
      this.assetLocationService.addAssetLocationDetailMode(this.assetLocationDetailForm.getRawValue())
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


