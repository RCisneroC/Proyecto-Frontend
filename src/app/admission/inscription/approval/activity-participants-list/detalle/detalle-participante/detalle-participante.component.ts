import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsParticipante, GetDataResultResponse } from 'app/admission/models/participant';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ApproveParticipantComponent } from '../approve-participant/approve-participant.component';
import { ResponseEF, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { ActivityActivityRequirement, ActivityRequirement, GetOneActivity } from 'app/admission/models/GetOneActivity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Requirement } from 'app/admission/models/Requeriminet';
import { InscriptionService } from 'app/admission/inscription/services/inscription.service';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { ViewPosterComponent } from 'app/admission/activitydetail/forms/view-poster/view-poster.component';

@Component({
  selector: 'app-detalle-participante',
  templateUrl: './detalle-participante.component.html',
  styleUrls: ['./detalle-participante.component.scss']
})
export class DetalleParticipanteComponent {
  public paramsId: any;
   DisplayNameDocument: string[] = [
    // 'Id',
    'nombre',
    'actualizar',
    'documentacion'
   ];
  oadingFile: boolean = false;
  public _GetDataResultResponse: GetDataResultResponse = {
    inscriptionId: 0,
    activityName: '',
    firstName:     '',
    lastName:      '',
    cedula:        '',
    statusName:    '',
    fechaInscrito: new Date()
  }
    dataSoruceActivityRequirements: ActivityRequirement[] = [
    {
      description: '',
      id: 0,
      name: '',
      statusId: 0
    }
    ];
  
  loadingFile: boolean = false;
  dataDocuments = new MatTableDataSource<ActivityRequirement>(this.dataSoruceActivityRequirements);
  @ViewChild(MatPaginator) 
  set paginator(value: MatPaginator) {
      this.dataDocuments.paginator = value;
  }
  
  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _ActivityService: ActivityDetailService,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    public elm: ElementRef,
     private _inscriptionService: InscriptionService
  ) {
    this.paramsId = Path.snapshot.params['id'];
    if (this.paramsId != null) {
      this.getDetails();
      this.getOneActivity();
    } else {
      this._router.navigate([localStorage.getItem('url')]);
    }
  }

  volverAtras() {
  this._router.navigate([localStorage.getItem('url')]);
  }
  getDetails() {
    this._ActivityService.loading = true;
    this._ActivityService.GetDetailsCedula(this.paramsId).subscribe({
      next: (res:DetailsParticipante) => {
        this._ActivityService._DetailsParticipante = res;
        if (res.detailsResponse.length > 0) {
          this._ActivityService._DetailsResponse = this._ActivityService._DetailsParticipante.detailsResponse[0];
        }
        this._ActivityService.loading = false;
      },
      error: (err) => {
      }
    })
  }

  aprobar() {
    this._GetDataResultResponse.cedula = this._ActivityService._DetailsResponse.cedula; //cedula
    this._GetDataResultResponse.inscriptionId = 0; //cedula
    this._GetDataResultResponse.activityName = this._ActivityService._DetailsResponse.name; //cedula
    this._GetDataResultResponse.firstName = this._ActivityService._DetailsResponse.firstName; //cedula
    this._GetDataResultResponse.lastName = this._ActivityService._DetailsResponse.lastName; //cedula
    const dialogRef = this._dialog.open(ApproveParticipantComponent, {
          data: {
            participant : this._GetDataResultResponse,
            accion: 'approved',
          },
          disableClose:true
        });

        dialogRef.afterClosed().subscribe((result:ResponseMessageMaestra) => {
          if (result == undefined) {
            return;
            }
            if (result.CodError == 200) {
                Swal.fire({
                    title: "Escuela Judicial",
                    text: result.Message,
                    icon: "success"
                });
              this.getDetails();
              } else {
                Swal.fire({
                  title: "Escuela Judicial",
                  text: result.Message,
                  icon: "warning"
                });
              }
        });
  }

  getOneActivity() {
    let id_actividad = localStorage.getItem('id_activida') || '0';
    // this._ActivityService.loading = true;
    this._ActivityService.GetOneActivity(id_actividad).
      subscribe({
        next: (res: GetOneActivity) => {
        // console.log(res);
          this.getDocumentos(res.activityActivityRequirements);
          
        }, error: (err) => {
          console.log(err);
          this._router.navigate(['/admission/schedule-list']);
        },
        complete: () => {
          //  this._ActivityService.loading = false;
        }
      })
  }

    async getDocumentos(res: ActivityActivityRequirement[]) {
    this.dataSoruceActivityRequirements = [];
    res.forEach((element: ActivityActivityRequirement) => {
      this.dataSoruceActivityRequirements.push(element.activityRequirement);
    });
      this.dataDocuments = new MatTableDataSource<ActivityRequirement>(this.dataSoruceActivityRequirements);
    this.dataDocuments.paginator = this.paginator;
      console.log('====================================');
      console.log(this.dataSoruceActivityRequirements);
      console.log('====================================');
    }
  
  verDocumento(row: Requirement) {
    this._inscriptionService.init_documentosIncripcion();
    this._inscriptionService.getDocumentos(this._ActivityService._DetailsParticipante.detailsResponse[0].inscriptionId.toString(), row.id.toString()).
      subscribe({
        next: (res) => {
          this._inscriptionService._documentosIncripcion = res;
          if (Array.isArray(this._inscriptionService._documentosIncripcion.getDocResp)) {
            if (this._verificarBS64.transform(this._inscriptionService._documentosIncripcion.getDocResp[0].docFile) != "pdf") {
                const dialogRef = this._dialog.open(ViewPosterComponent, {
                data: {
                  type: this._verificarBS64.transform(this._inscriptionService._documentosIncripcion.getDocResp[0].docFile),
                  accion: 'view-poster',
                  posterFile: this._inscriptionService._documentosIncripcion.getDocResp[0].docFile,
                  comment: [],
                  poster: row,
                },
                disableClose: true,
              });
              } else {
                const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
                data: {
                  type: this._verificarBS64.transform(this._inscriptionService._documentosIncripcion.getDocResp[0].docFile),
                  accion: 'view-poster',
                  posterFile: this._inscriptionService._documentosIncripcion.getDocResp[0].docFile,
                  comment: [],
                  poster: row,
                  },
                  width:'1000px',
                disableClose: true,
              });
              }
            
          } else {
            Swal.fire({
                title: "Escuela Judicial",
                text: 'No mantiene documentación.',
                icon: "warning"
          });
          }
          console.log(res);
          
        }
      });
  }

    onChangeFile(event: any, requerimentId: number, requirement: Requirement) {
    console.log(name);
    this.loadingFile = true;
    const files:FileList = event.target.files;
    console.log(requirement.name);
    const elementImg = this.elm.nativeElement.querySelector('#archivo_' + requerimentId);
    const elementText = this.elm.nativeElement.querySelector('#texto_' + requerimentId);

    if (files.length > 0) {
      var formdata = new FormData();
      formdata.append('cedula', this._ActivityService._DetailsParticipante.detailsResponse[0].cedula);
      formdata.append('FileType', requerimentId.toString());
      formdata.append('InscriptionId', this._ActivityService._DetailsParticipante.detailsResponse[0].inscriptionId.toString());
      formdata.append('File', files[0]);
      this._inscriptionService.CargaDocumentoRequirement(formdata).subscribe({
        next: (res:ResponseEF) => {
            Swal.fire({
                title: "Escuela Judicial",
                text: '('+requirement.name+') '+res.message,
                icon: "success"
            });
          
          elementImg.value = '';
          elementText.innerHTML  = '('+requirement.name+') '+'Cargado Correctamente.';
          this.loadingFile = false;
          // this.verificarDocumentacion();
        }, error: (err) => {
          elementImg.value = '';
          Swal.fire({
                title: "Escuela Judicial",
                text: 'Intente nuevamente..',
                icon: "warning"
          });
           this.loadingFile = false;
        }
      })
    }
    }
  

}
