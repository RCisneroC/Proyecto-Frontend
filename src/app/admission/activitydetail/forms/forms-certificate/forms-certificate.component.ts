import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
export interface DialogData {
  id_actividad: string;
  accion: string;
}
@Component({
  selector: 'app-forms-certificate',
  templateUrl: './forms-certificate.component.html',
  styleUrls: ['./forms-certificate.component.scss']
})
export class FormsCertificateComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string;
  dialogTitle: string = '';
  CertificateForms: UntypedFormGroup;
  id_actividad: string = '';
  ListadoDocumentos: any;
  constructor(
    public dialogRef: MatDialogRef<FormsCertificateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityService: ActivityDetailService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);
    if (this.action === 'add-cetificate') {
      this.dialogTitle = "Diseño del Certificado";
      this.id_actividad = data.id_actividad;
    }
    this.CertificateForms = this.fb.group({
      CertificateTemplate: ['', [Validators.required]],
      ActivityId: [data.id_actividad, [Validators.required]]
    });
  }

  submit() {
    console.log(this.CertificateForms.getRawValue());
    var _Form_Data = new FormData();
    _Form_Data.append('CertificateTemplate', this.CertificateForms.get('CertificateTemplate')?.value);
    _Form_Data.append('ActivityId', this.CertificateForms.get('ActivityId')?.value);
    this._ActivityService.SaveCertificate(_Form_Data).subscribe({
      next: (res: ResponseGenerica) => {
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Cargado correctamente.';
        this.dialogRef.close(this.ResponseMessage);
      },
      error: (err) => {
        this.ResponseMessage.CodError = 500;
        this.ResponseMessage.Message = err;
        this.dialogRef.close(this.ResponseMessage);
      }
    })
  }
}
