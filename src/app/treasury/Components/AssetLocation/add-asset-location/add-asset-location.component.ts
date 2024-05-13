import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/service/auth.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { AssetLocation } from 'app/treasury/Models/AssetLocation';
import { AssetLocationService } from 'app/treasury/Services/asset-location.service';

export interface DialogData {
  id: string;
  action: string;
  assetLocation: AssetLocation;
}
@Component({
  selector: 'app-add-asset-location',
  templateUrl: './add-asset-location.component.html',
  styleUrls: ['./add-asset-location.component.scss']
})
export class AddAssetLocationComponent  implements OnInit{

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public assetLocationForm!: UntypedFormGroup;
  public assetLocation: AssetLocation = {
    createdDate: '',
    asignacionId: 0,
    numeroFormatoEmitido: 0,
    ubicacion: '',
    a_QuienSeLeAsigna: '',
    tipo: '',
    createdBy: ''
  }
  periodoId: number=0;
  constructor(
    public dialogRef: MatDialogRef<AddAssetLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public assetLocationService: AssetLocationService,
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Editar asignación de bienes";
      this.assetLocation = data.assetLocation;
    } else {
      this.dialogTitle = 'Nueva asignación de bienes';
    }
  
    
  }
  
  ngOnInit() {
   // this.loadPeriodoContable();
    this.assetLocationForm = this.createContactForm();
  }

  // loadPeriodoContable() {
  //   this.pettyCashService.getPeriodo().subscribe({
  //     next: (data) => {
  //       this.periodoId = data["getPeriodContables"][0].periodoId;
  //       this.pettyCashForm = this.createContactForm();
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.log(error.message);
  //     },
  //   });
  // }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      asignacionId: [this.assetLocation.asignacionId, [Validators.required]],
      numeroFormatoEmitido: [this.assetLocation.numeroFormatoEmitido, [Validators.required]],
      ubicacion: [this.assetLocation.ubicacion, [Validators.required]],
      a_QuienSeLeAsigna: [this.assetLocation.a_QuienSeLeAsigna, [Validators.required]],
      tipo: [this.assetLocation.tipo, [Validators.required]],
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
      this.assetLocationService.updateAssetLocationMode(this.assetLocationForm.getRawValue())
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
      this.assetLocationService.addAssetLocationMode(this.assetLocationForm.getRawValue())
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


