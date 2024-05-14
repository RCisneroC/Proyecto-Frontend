import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/service/auth.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { AssetLocationDetail } from 'app/treasury/Models/AssetLocation';
import { AssetLocationService } from 'app/treasury/Services/asset-location.service';

export interface DialogData {
  id: string;
  detaiilId:number;
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
    detailAsignacionId:[this.data.detaiilId, Validators.required],
    numero: [this.assetLocationDetail.numero, Validators.required],
    placa: [this.assetLocationDetail.placa, Validators.required],
    descripcion: [this.assetLocationDetail.descripcion, Validators.required],
    marca: [this.assetLocationDetail.marca, Validators.required],
    modelo: [this.assetLocationDetail.modelo, Validators.required],
    serie: [this.assetLocationDetail.serie, Validators.required],
    estadoFisico: [this.assetLocationDetail.estadoFisico, Validators.required],
    observaciones: [this.assetLocationDetail.observaciones],
    modifiedBy: [this.authService.currentUserValue.id],
    createdBy:[this.authService.currentUserValue.id],
    asignacionBienActivosFijosId:[this.assetLocationDetail.asignacionBienActivosFijosId],
    statusId: [4],
      
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


