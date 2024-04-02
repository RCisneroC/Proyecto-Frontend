import { Component,  OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { RequestServicesService } from '../Services/request-services.service';
import { InfoDegreeByIdentificationCard } from '../Models/InfoDegreeByIdentificationCard';
import { AuthService } from '@core';
import Swal from 'sweetalert2';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';


@Component({
  selector: 'app-creditos-no-oficiales',
  templateUrl: './creditos-no-oficiales.component.html',
  styleUrls: ['./creditos-no-oficiales.component.scss']
})
export class CreditosNoOficialesComponent implements OnDestroy,OnInit {
  creditosNoOficialesForm: UntypedFormGroup;
  subscriptions: Subscription[] = [];
  public lstDegree : any[] = [];

 constructor( private fb: UntypedFormBuilder, private _service:RequestServicesService
  ,private authService: AuthService, public _dialog: MatDialog,){
    this.creditosNoOficialesForm = this.createCredOForm();
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


  generarNoOficialCredit() {

   const id : string = this.creditosNoOficialesForm.controls["formacionEspecializada"]?.value;

   this._service.downloadCreditsNoOficial(id).subscribe({
      next: (res) => {

        if (res.success) {
          this._dialog.open(ViewPosterPDFComponent, {
            data: {
              type: 'pdf',
              accion: 'view-poster',
              posterFile: res.data.pdfContentInBase64,
              comment: [],
              poster: res.data.contentInHtml,
            },
            width: '1200px',
            disableClose: true,
          });
        }
        else {
          Swal.fire({
            title: "Escuela Judicial",
            text: "No se pudieron generar los créditos no oficiales",
            icon: "warning"
          });
        }

      },
      error : (err: HttpErrorResponse) =>{
        Swal.fire({
          title: "Escuela Judicial",
          text: "No se pudieron generar los créditos no oficiales",
          icon: "warning"
        });
       }
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
