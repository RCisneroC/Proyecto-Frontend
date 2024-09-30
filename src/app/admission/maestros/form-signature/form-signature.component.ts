import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@core';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { ViewPosterComponent } from 'app/admission/activitydetail/forms/view-poster/view-poster.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ScheduleActivitiesService } from 'app/admission/services/schedule-activities.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-form-signature',
  templateUrl: './form-signature.component.html',
  styleUrls: ['./form-signature.component.scss']
})
export class FormSignatureComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  PosterForm!: UntypedFormGroup;
  tmp_files: any[50] = [];

  constructor(
    private fb: UntypedFormBuilder,
    public authService:AuthService,
    public _verificarBS64: VerificarBS64Pipe,
    public scheduleActivitiesService:ScheduleActivitiesService,
    public _dialog: MatDialog
    //public dialogRef: MatDialogRef<FormSignatureComponent>,
  ) {


  }
  ngOnInit(): void {
    this.PosterForm = this.fb.group({
      CertificateSignature: ['', [Validators.required]],
      UserId: [this.authService.currentUserValue.id, [Validators.required]]
    });
  }
  onFileSelected(event: any) {
    // console.log(event, idx, docId);
    
    this.tmp_files[0] = (event.target.files[0]);
    console.log('====================================');
    console.log(this.tmp_files);
    console.log('====================================');
    //this.tmp_docType[0] = (event);
   // const formdata = new FormData();
    //formdata.append('FileDetails', this.tmp_files[0]);
  }
  base64String: string = '';
  viewDocumento() {
  const file=this.tmp_files[0];
  
  const reader = new FileReader();

  reader.onload = (e) => {
    const base64String = e.target?.result as string;
    // Aquí puedes utilizar base64String, por ejemplo:
    
    this.base64String= base64String.toString();
    // Enviar a un servidor, mostrar una vista previa, etc.
  };
  
  reader.readAsDataURL(file);
  this.base64String = this.base64String.split(",")[1];
    if (this._verificarBS64.transform(this.base64String) != "pdf") {
       this._dialog.open(ViewPosterComponent, {
        data: {
          type: this._verificarBS64.transform(this.base64String),
          accion: 'view-poster',
          posterFile: this.base64String,
          comment: "",
          poster: this.base64String,
        },
        disableClose: true,
      });
    } else {
       this._dialog.open(ViewPosterPDFComponent, {
        data: {
          type: this._verificarBS64.transform(this.base64String),
          accion: 'view-poster',
          posterFile: this.base64String,
          comment: "",
          poster: this.base64String,
        },
        width: '1000px',
        disableClose: true,
      });
    }

  }
  submit() {
     const formdata = new FormData();
     formdata.append('CertificateSignature', this.PosterForm.controls['CertificateSignature'].value);
     formdata.append('UserId', this.PosterForm.controls['UserId'].value);
    this.scheduleActivitiesService.addCertificate(formdata).subscribe({
      next: () => {
      
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Cargado correctamente.',
          icon: "success"
        });
      },
      error: () => {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Intente nuevamente.',
          icon: "success"
        });
      }
    });

  }
}
