import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  AcadInfoEF,
  DetailsParticipanteEF,
  ExperienceInfoEF,
  GetDataResultResponse
} from "../../../../models/participant";
import { ActivityActivityRequirement, ActivityRequirement, GetOneActivity } from "../../../../models/GetOneActivity";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityDetailService } from "../../../../services/activity-detail.service";
import { MatDialog } from "@angular/material/dialog";
import { VerificarBS64Pipe } from "../../../../../pipes/verificar-bs64.pipe";
import { InscriptionService } from "../../../services/inscription.service";
import {
  ApproveParticipantComponent
} from "../../../approval/activity-participants-list/detalle/approve-participant/approve-participant.component";
import { ResponseEF, ResponseMessageMaestra } from "../../../../models/ResponseMessage";
import Swal from "sweetalert2";
import { Requirement } from "../../../../models/Requeriminet";
import { ViewPosterComponent } from "../../../../activitydetail/forms/view-poster/view-poster.component";
import { ViewPosterPDFComponent } from "../../../../activitydetail/forms/view-poster-pdf/view-poster-pdf.component";
import { InscriptionResponse } from "../../../../models/ParticipantesEF";
import { ApprovalIncriptionComponent } from "../approval-incription/approval-incription.component";
import { AuthService } from "@core";
import { co } from "@fullcalendar/core/internal-common";

@Component({
  selector: 'app-partaker-detail-inscription-component',
  templateUrl: './partaker-detail-inscription-component.component.html',
  styleUrls: ['./partaker-detail-inscription-component.component.scss']
})
export class PartakerDetailInscriptionComponent {
  public paramsId: any;
  DisplayNameDocument: string[] = [
    // 'Id',
    'nombre',
    'actualizar',
    'documentacion'
  ];

  DisplayNameAcadInfo: string[] = [
    'Institucion',
    'Programa',
    'Título',
    'Años',
  ];

  DisplayNameExperienceInfo: string[] = [
    'Entidad',
    'Posición',
    'Período',
    'Meses',
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
  dataSoruceActivityRequirements: ActivityRequirement[] = [
    {
      description: '',
      id: 0,
      name: '',
      statusId: 0
    }
  ];

  dataSourceAcadInfo: AcadInfoEF[] = [{
    institutionOfeducation: '',
    program: '',
    obtainedTitle: '',
    year: 0

  }]

  dataSourceExperienceInfo: ExperienceInfoEF[] = [{
    entidad: '',
    position: '',
    period: '',
    months: ''
  }]

  loadingFile: boolean = false;
  dataAcadInfo = new MatTableDataSource<AcadInfoEF>(this.dataSourceAcadInfo);
  dataExperienceInfo = new MatTableDataSource<ExperienceInfoEF>(this.dataSourceExperienceInfo);
  dataDocuments = new MatTableDataSource<ActivityRequirement>(this.dataSoruceActivityRequirements);
  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataDocuments.paginator = value;
  }

  @ViewChild('ListaAcadInfo')
  set paginatorAcadInfo(value: MatPaginator) {
    this.dataAcadInfo.paginator = value;
  }

  @ViewChild('ListaExperienceInfo')
  set paginatorExperienceInfo(value: MatPaginator) {
    this.dataExperienceInfo.paginator = value;
  }


  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _ActivityService: ActivityDetailService,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    public elm: ElementRef,
    private _inscriptionService: InscriptionService,
    private authService: AuthService
  ) {
    this.paramsId = Path.snapshot.params['id'];
    if (this.paramsId != null) {
      this.getDetails();
      this.getRequirementsDocuments();
      this.getAcadInfo();
      this.getExperiencenfo();
      this.makeAutoAssigment();
    } else {
      this._router.navigate([localStorage.getItem('url_list_partaker')]);
    }
  }

  volverAtras() {
    this._router.navigate([localStorage.getItem('url_list_partaker')]);
  }

  getAcadInfo() {
    this._inscriptionService.GetAcadInfoEF(this.paramsId).subscribe({
      next: (res) => {
        this.dataAcadInfo = new MatTableDataSource<AcadInfoEF>(res.inscriptionResponse);
        console.log("AcadInfo", res.inscriptionResponse)
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  getExperiencenfo() {
    this._inscriptionService.GetExperienceInfoEF(this.paramsId).subscribe({
      next: (res) => {
        this.dataExperienceInfo = new MatTableDataSource<ExperienceInfoEF>(res.experienceInfoResponse);
        console.log("ExperienceInfo", res.experienceInfoResponse)
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  makeAutoAssigment() {
    const item = localStorage.getItem('userItem');
    if (item != null) {
      const UserItem: InscriptionResponse = JSON.parse(item);
      const User = this.authService.currentUserValue;
      const ReuestObj = {
        aspNetUsersId: User.id,
        inscriptionId: UserItem.inscriptionId,
        createdBy: User.id
      }
      this._inscriptionService.AssignParticipant(ReuestObj).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);

        }
      })
    }

  }

  EnrollmentAction() {
    this._inscriptionService.EnrollmentAction(this._ActivityService._DetailsParticipanteEF.getDetailsResponse[0].inscriptionId.toString()).subscribe({
      next: (res) => {
        console.log("EnrollmentAction response", res);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  getDetails() {
    this._ActivityService.loading = true;
    this._ActivityService.GetDetailsEFCedula(this.paramsId).subscribe({
      next: (res: DetailsParticipanteEF) => {
        this._ActivityService._DetailsParticipanteEF = res;
        console.log("Activity obj", res);
        if (res.getDetailsResponse.length > 0) {
          this._ActivityService._DetailsResponseEF = this._ActivityService._DetailsParticipanteEF.getDetailsResponse[0];
        }
        this._ActivityService.loading = false;
      },
      error: (err) => {
      }
    })
  }


  aprobar() {
    const item = localStorage.getItem('userItem');
    if (item != null) {
      const user: InscriptionResponse = JSON.parse(item);

      const dialogRef = this._dialog.open(ApprovalIncriptionComponent, {
        data: {
          participant: user,
          accion: 'approved',
        },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
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
          this.EnrollmentAction();
        } else {
          Swal.fire({
            title: "Escuela Judicial",
            text: result.Message,
            icon: "warning"
          });
        }
      });
    }


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

  getRequirementsDocuments() {
    const degreeid = localStorage.getItem('partaker_degreeid');
    if (degreeid != null) {
      this._inscriptionService.getRequirementsDocuments(degreeid).subscribe({
        next: (data) => {
          console.log('Datos de los documentos requeridos por ISJUP:', data);
          this.dataDocuments = data;
        }
      })
    }


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
    this._inscriptionService.getDocumentos(this._ActivityService._DetailsParticipanteEF.getDetailsResponse[0].inscriptionId.toString(), row.id.toString()).
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
          console.log(res);

        }
      });
  }

  onChangeFile(event: any, requerimentId: number, requirement: Requirement) {
    console.log(name);
    this.loadingFile = true;
    const files: FileList = event.target.files;
    console.log(requirement.name);
    const elementImg = this.elm.nativeElement.querySelector('#archivo_' + requerimentId);
    const elementText = this.elm.nativeElement.querySelector('#texto_' + requerimentId);

    if (files.length > 0) {
      var formdata = new FormData();
      formdata.append('cedula', this._ActivityService._DetailsParticipanteEF.getDetailsResponse[0].cedula);
      formdata.append('FileType', requerimentId.toString());
      formdata.append('InscriptionId', this._ActivityService._DetailsParticipanteEF.getDetailsResponse[0].inscriptionId.toString());
      formdata.append('File', files[0]);
      this._inscriptionService.CargaDocumentoEFRequirement(formdata).subscribe({
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
