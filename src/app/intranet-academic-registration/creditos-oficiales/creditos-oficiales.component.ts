import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import Swal from 'sweetalert2';
import { InfoDegreeByIdentificationCard } from '../Models/InfoDegreeByIdentificationCard';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RequestServicesService } from '../Services/request-services.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-creditos-oficiales',
  templateUrl: './creditos-oficiales.component.html',
  styleUrls: ['./creditos-oficiales.component.scss']
})
export class CreditosOficialesComponent {

  creditosOficialesForm: UntypedFormGroup;
  subscriptions: Subscription[] = [];
  public lstDegree : any[] = [];

 constructor( private fb: UntypedFormBuilder, private _service:RequestServicesService
  ,private authService: AuthService, public _dialog: MatDialog,){
    this.creditosOficialesForm = this.createCredOForm();
  }

  ngOnInit():void {
    this.loadDegrees();
  }


  createCredOForm(): UntypedFormGroup {
    return this.fb.group({
      formacionEspecializada: ['', Validators.required]
    });
  }

  loadDegrees():void{
    // "1-23-45";
    const cedula = this.authService.currentUserValue.cedula;
    this._service.searchInfoDegreeByIdentificationCard(cedula).subscribe(
      {
        next : (request) =>{
                  const result = request as InfoDegreeByIdentificationCard;
                  if(result.success){
                    this.lstDegree = result.data;
                  }
                  else{
                    this.lstDegree = [];
                  }
        },
        error : (err: HttpErrorResponse) =>{
                console.log(err);
        }
      }
    );

  }


  generarOficialCredit() {

   const id : string = this.creditosOficialesForm.controls["formacionEspecializada"]?.value;

  this._service.downloadCreditsOficial(id).subscribe({
     next: (res) => {

       if (res.success) {
          this._dialog.open(ViewPosterPDFComponent, {
            data: {
              type: 'pdf',
              accion: 'view-poster',
              posterFile: res.data.pdfContentInBase64,
                //posterFile: environment.conradoprueba,
              comment: [],
              poster: res.data.pdfContentInBase64,
            },
            width: '1200px',
            disableClose: true,
          });
        }
        else {
          Swal.fire({
            title: "Escuela Judicial",
            text: "No se pudieron generar los créditos oficiales",
            icon: "warning"
          });
        }

     },
      error : () =>{
        Swal.fire({
          title: "Escuela Judicial",
          text: "No se pudieron generar los créditos oficiales",
          icon: "warning"
        });
      }
    })
 }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}



