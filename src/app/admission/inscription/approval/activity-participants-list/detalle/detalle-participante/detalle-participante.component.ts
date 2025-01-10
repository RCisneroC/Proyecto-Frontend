import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsParticipante, GetDataResultResponse } from 'app/admission/models/participant';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ApproveParticipantComponent } from '../approve-participant/approve-participant.component';
import { ResponseEF, ResponseMessageExtended, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { ActivityActivityRequirement, ActivityRequirement, GetOneActivity } from 'app/admission/models/GetOneActivity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Requirement } from 'app/admission/models/Requeriminet';
import { InscriptionService } from 'app/admission/inscription/services/inscription.service';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { ViewPosterComponent } from 'app/admission/activitydetail/forms/view-poster/view-poster.component';
import { GetDocResp, documentosIncripcion } from "../../../../../models/documentosIncripcion";
import { AuthService } from "@core";
import { el } from "@fullcalendar/core/internal-common";
import { isArray } from 'chart.js/dist/helpers/helpers.core';
import {
  RequestServicesService
} from "../../../../../../intranet-academic-registration/Services/request-services.service";

@Component({
  selector: 'app-detalle-participante',
  templateUrl: './detalle-participante.component.html',
  styleUrls: ['./detalle-participante.component.scss']
})
export class DetalleParticipanteComponent {
  public paramsId: any;
  public activity:any;
  ActivityTriningType: string = '';
  UserRole: string = '';
  DisplayNameDocument: string[] = [
    // 'Id',
    'nombre',
    'actualizar',
    'estado',
    'documentacion'
  ];
  oadingFile: boolean = false;
  public _GetDataResultResponse: GetDataResultResponse = {
    inscriptionId: 0,
    activityName: '',
    firstName: '',
    lastName: '',
    cedula: '',
    statusName: '',
    fechaInscrito: new Date()
  }
  dataSoruceActivityRequirements: GetDocResp[] = [
    {
      documentId: 0,
      docFile: '',
      fileType: '',
      validate: false,
      name: '',
      inscriptionId: 0
    }
  ];
  public Array_GetDocResp: GetDocResp[] = [];

  loadingFile: boolean = false;
  public documentosIncripcion!: documentosIncripcion;
  dataDocuments = new MatTableDataSource<GetDocResp>(this.dataSoruceActivityRequirements);
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
    private _inscriptionService: InscriptionService,
    private authService: AuthService,
    public _RequestService:RequestServicesService,
  ) {
    this.ActivityTriningType = localStorage.getItem('Activity_Training_Type') || '';
    this.UserRole =this._RequestService.getRoleFromToken(this.authService.currentUserValue.token);
    this.paramsId = Path.snapshot.params['id'];
    this.activity = localStorage.getItem('id_activida') || '';
    
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
    this._ActivityService.GetDetailsCedulaDetalleInfoStudenst(this.paramsId,this.activity).subscribe({
      next: (res: DetailsParticipante) => {
        this._ActivityService._DetailsParticipante = res;
        if (res.detailsResponse.length > 0) {
          this._ActivityService._DetailsResponse = this._ActivityService._DetailsParticipante.detailsResponse[0];
          this.getDocumentosInscripcion();
        }
        this._ActivityService.loading = false;
      },
      error: (err) => {
      }
    })
  }

  CreateUserEC(StatusID: number) {
    this._inscriptionService.CreateUserEC(this._ActivityService._DetailsParticipante.detailsResponse[0].inscriptionId, StatusID, 1, this.authService.currentUserValue.id).subscribe({
      next: (res) => {

        if (res.isError) {
          Swal.fire({
            title: "Escuela Judicial",
            text: "No se pudo crear el usuario correctamente",
            icon: "warning"
          });
        } else {
          const reqOBJ = {
            activityId: res.actividadId,
            participantId: res.participantId,
            isReentry: false,
            enrollmentId: 1,
          }
          // verificar este punto.
          this._inscriptionService.CreateECAcademicRecord(reqOBJ).subscribe({
            next: (res) => {
              console.log('CreateECAcademicRecord', res);
            }
          })
        }
      }
    })
  }

  getDocumentosInscripcion() {
    this.Array_GetDocResp = [];
    this._inscriptionService.GtedocumentoEC(this._ActivityService._DetailsResponse.inscriptionId).subscribe({
      next: (res) => {
        if (Array.isArray(res.getDocResp)) {
          res.getDocResp.forEach((element: GetDocResp) => {
            this._ActivityService.getOneDocumento(element.fileType).subscribe({
              next: (res) => {
                element.name = res.name;
                this.Array_GetDocResp.push(element);

              },
              complete: () => {
                this.dataDocuments = new MatTableDataSource<GetDocResp>(this.Array_GetDocResp);
              }
            })
          });
        }
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
        participant: this._GetDataResultResponse,
        accion: 'approved',
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: ResponseMessageExtended) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {

        this.getDetails();
        this.CreateUserEC(result.status);
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
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

        }, error: (err) => {
          this._router.navigate(['/admission/schedule-list']);
        },
        complete: () => {
          //  this._ActivityService.loading = false;
        }
      })
  }

  // async getDocumentos(res: ActivityActivityRequirement[]) {
  //   this.dataSoruceActivityRequirements = [];
  //   res.forEach((element: ActivityActivityRequirement) => {
  //     this.dataSoruceActivityRequirements.push(element.activityRequirement);
  //   });
  //   this.dataDocuments = new MatTableDataSource<ActivityRequirement>(this.dataSoruceActivityRequirements);
  //   this.dataDocuments.paginator = this.paginator;
  //   console.log('====================================');
  //   console.log(this.dataSoruceActivityRequirements);
  //   console.log('====================================');
  // }

  verDocumento(row: GetDocResp) {
    this._inscriptionService.init_documentosIncripcion();
    // this._ActivityService._DetailsParticipante.detailsResponse[0].inscriptionId.toString()
    this._inscriptionService.getDocumentos(row.inscriptionId.toString(), row.fileType.toString()).
      subscribe({
        next: (res) => {
          this._inscriptionService._documentosIncripcion = res;
          this.documentosIncripcion = res;
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
                width: '1000px',
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

        }
      });
  }

  validarDocumentos(row: GetDocResp) {

    this._inscriptionService.getDocumentos(row.inscriptionId.toString(), row.fileType.toString()).
      subscribe({
        next: (res) => {
          this._inscriptionService._documentosIncripcion = res;
          this.documentosIncripcion = res;
          if (Array.isArray(this._inscriptionService._documentosIncripcion.getDocResp)) {
            var request = {
              documentId: this.documentosIncripcion.getDocResp[0].documentId,
              validate: true,
              lastModifiedBy: this.authService.currentUserValue.id
            }
            if (this.documentosIncripcion.getDocResp[0].validate) {
              Swal.fire({
                title: "Escuela Judicial",
                text: 'El documento ya fue validado',
                icon: "warning"
              });
            }
            else {
              this._inscriptionService.ValidateDocument(request).subscribe({
                next: (res) => {
                  if (res.isError === false) {
                    Swal.fire({
                      title: "Escuela Judicial",
                      text: 'Documento validado con exitosamente',
                      icon: "success"
                    });
                    this.getDocumentosInscripcion();
                  }
                  else {
                    Swal.fire({
                      title: "Escuela Judicial",
                      text: 'El documento no pudo ser validado',
                      icon: "warning"
                    });
                  }
                }
              })
            }
          } else {
            Swal.fire({
              title: "Escuela Judicial",
              text: 'No mantiene documentación.',
              icon: "warning"
            });
          }

        }
      });
  }

  onChangeFile(event: any, requerimentId: number, requirement: Requirement) {

    this.loadingFile = true;
    const files: FileList = event.target.files;
    console.log(files);
    const elementImg = this.elm.nativeElement.querySelector('#archivo_' + requerimentId);
    const elementText = this.elm.nativeElement.querySelector('#texto_' + requerimentId);

    if (files.length > 0) {
      if (files[0].type != 'application/pdf' && files[0].type != 'image/png' && files[0].type != 'image/jpeg') {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Solo se permite tipo de archivo PDF/JPG/PNG.',
          icon: "warning"
        });
        this.loadingFile = false;
        elementImg.value = '';
        return;
      }
      var formdata = new FormData();
      formdata.append('cedula', this._ActivityService._DetailsParticipante.detailsResponse[0].cedula);
      formdata.append('FileType', requerimentId.toString());
      formdata.append('InscriptionId', this._ActivityService._DetailsParticipante.detailsResponse[0].inscriptionId.toString());
      formdata.append('File', files[0]);
      this._inscriptionService.CargaDocumentoRequirement(formdata).subscribe({
        next: (res: ResponseEF) => {
          Swal.fire({
            title: "Escuela Judicial",
            text: '(' + requirement.name + ') ' + res.message,
            icon: "success"
          });

          elementImg.value = '';
          elementText.innerHTML = '(' + requirement.name + ') ' + 'Cargado Correctamente.';
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
