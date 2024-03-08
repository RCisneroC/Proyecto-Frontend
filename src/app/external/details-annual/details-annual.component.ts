import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { ExternalInscriptionService } from '../services/external-inscription.service';
import { AnnualPlanService } from 'app/admission/FormalEducations/Services/annual-plan.service';
import { AnnualPlan, Period } from 'app/admission/FormalEducations/Models/AnnualPlan';
import { DegreeCurriculumDesign, PosterRequest } from 'app/admission/FormalEducations/Models/Degree';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SubjectPeriod } from 'app/admission/FormalEducations/Models/PlanSubject';
import { RequirementAdmision } from 'app/admission/FormalEducations/Models/RequirementAdmision';
import { MatDialog } from '@angular/material/dialog';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ViewPosterComponent } from 'app/admission/activitydetail/forms/view-poster/view-poster.component';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { PlanEstudioList } from 'app/admission/FormalEducations/Models/PlanEstudio';

@Component({
  selector: 'app-details-annual',
  templateUrl: './details-annual.component.html',
  styleUrls: ['./details-annual.component.scss']
})
export class DetailsAnnualComponent {
  public paramsId: any;
  public converId: any;
  public IsImage: boolean = false;
  public ext: any;
  public blobUrl: string = "";

  public id: string = '';
  public ocultar: boolean = false;
  public _Listado: PlanEstudioList[] = [
    {
      year: 0,
      periods: [
        {
          statusId: 0,
          id: 0,
          name: '',
          description: '',
          startDate: new Date(),
          endDate: new Date(),
          maxNumOfParticipants: 0,
          subjects: [
            {
              statusId: 0,
              id: 0,
              name: '',
              description: '',
              number: 0,
              acronym: '',
              code: '',
              numOfCredits: 0,
              numOfHours: 0,
              numOfClasses: 0,
              hasLaboratory: false,
              evaluationCriteria: '',
            }
          ]
        }
      ]
    }
  ];
  DisplayNamePeriod: string[] = [
    'name',
    // 'descripcion',
    'maxCupos',
    'start',
    'end',
  ];

  DisplayNameCurriculares: string[] = [
    'name',
    'descripcion',
    'start',
    'end',
    'accion'
  ];
  public detalleMalla: DegreeCurriculumDesign = {
    statusId: 0,
    id: 0,
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    degreeCurriculumDesignTarget: 0,
  };

  dataSourcePeriod: Period[] = [
    {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      maxNumOfParticipants: 0,
    },
  ];

  dataSourceDegreeCurriculumDesign: DegreeCurriculumDesign[] = [
    {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      degreeCurriculumDesignTarget: 0,
    },
  ];

  public _PosterRequest!: PosterRequest[];
  public _RequirementAdmission!: RequirementAdmision[];
  public PrincipalPoster: PosterRequest = {
    statusId: 0,
    id: 0,
    approvedBy: '',
    approvalDate: '',
    approvalMessage: '',
    degreeId: 0,
    degreeName: '',
    poster: {
      fileContents: '',
      contentType: '',
      fileDownloadName: '',
      lastModified: '',
      entityTag: '',
      enableRangeProcessing: false,
    },
    posterType: 0,
    posterComments: [{
      text: '',
      userId: '',
    }],
  };
  public urlConvocatoria: string = '';
  dataPeriod = new MatTableDataSource<Period>(this.dataSourcePeriod);
  dataDegreeCurriculum = new MatTableDataSource<DegreeCurriculumDesign>(this.dataSourceDegreeCurriculumDesign);

  @ViewChild('listadoPeriodo')
  set paginatorPeriod(value: MatPaginator) {
    this.dataPeriod.paginator = value;
  }

  @ViewChild('ListadoMallaCurriculares')
  set paginatorMallaCurriculares(value: MatPaginator) {
    this.dataDegreeCurriculum.paginator = value;
  }
  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _ActivityService: ActivityDetailService,
    public _external: ExternalInscriptionService,
    public _PlanAnnual: AnnualPlanService,
    public _dialog: MatDialog,
    public elm: ElementRef,
    public _verificarBS64: VerificarBS64Pipe
  ) {
    this.paramsId = Path.snapshot.params['id'];
    if (this.paramsId != null) {
      this.converId = _ActivityService.decryptData(this.paramsId, 'Panama2019$');
      this.getPlanAnual();
      this.getListadoPeriodo();
      this.getMallaCurriculo();
    } else {
      this._router.navigate(['/']);
    }
  }

  getPlanAnual() {
    this._PlanAnnual.GetAnualPlan(this.converId).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem("Plan-anual-detail", res.name);
      },
      error: () => {

      }
    })
  }
  getListadoPeriodo() {
    this._PlanAnnual.GetPeriodAnnualPlan(this.converId).subscribe({
      next: (res) => {
        this.dataPeriod = new MatTableDataSource<Period>(res);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  getMallaCurriculo() {
    this._PlanAnnual.GetMallaAnnualPlan(this.converId).subscribe({
      next: (res) => {
        this.dataDegreeCurriculum = new MatTableDataSource<DegreeCurriculumDesign>(res);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  regresar() {
    this.ocultar = false;
  }
  verDetalle(row: DegreeCurriculumDesign) {
    console.log(row);

    this.ocultar = true;
    this.getAfichesMalla(row.id);
    this.getDocumentosMalla(row.id);
    this.detalleMalla = row;
    this.getOnePeriodSubject(row.id);
  }
  getOnePeriodSubject(id: number) {
    this._Listado = [];
    this._PlanAnnual.getSubjectPeiod(id).subscribe({
      next: (res) => {
        this._Listado = res;
      }
    })
  }

  getAfichesMalla(IdParams: any) {
    this._PosterRequest = [];
    this._PlanAnnual.getAfichesMalla(IdParams).subscribe({
      next: (res) => {
        console.log(res);

        // this._PosterRequest = res;
        res.forEach((element: PosterRequest) => {
          if (element.posterType == 1 && element.statusId == 5) {
            this.PrincipalPoster = element;
            this.ext = element.poster.contentType.split('/');
            if (this.ext.length > 1) {
              if (this.ext[0] == 'image') {
                this.IsImage = true;
                this.RenderImage();
              } else {
                this.IsImage = false;
                this.renderPDF(element.poster.fileContents);
              }
            }
          } else {
            if (element.statusId == 5) {
              this._PosterRequest.push(element);
            }
          }
        });
      }
    })
  }
  getDocumentosMalla(IdParams: any) {
    this._PlanAnnual.getDocumentosMalla(IdParams).subscribe({
      next: (res) => {
        this._RequirementAdmission = res;
      }
    })
  }
  inscribir() {
    localStorage.setItem("backplandetails",'/student/details-annual-plan/' + this.paramsId)
    this._router.navigate(['/student/external-EF/' + this.paramsId]);
  }

  RenderImage() {
    setTimeout(() => {
      const elementImg = this.elm.nativeElement.querySelector('#image');
      this.elm.nativeElement.querySelector('#image').src = 'data:image/png;base64,' + this.PrincipalPoster.poster.fileContents;
    }, 1000);
  }

  renderPDF(base64PDF: string) {
    setTimeout(() => {
      const element = this.elm.nativeElement.querySelector('#pdf');
      const blob = this.base64toBlob(base64PDF, 'application/pdf');
      this.blobUrl = URL.createObjectURL(blob);
      console.log(this.blobUrl);
      element.src = this.blobUrl;
    }, 1000);
  }

  base64toBlob(base64: string, type: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: type });
  }

  viewDocumento(row: PosterRequest) {
    if (this._verificarBS64.transform(row.poster.fileContents) != "pdf") {
      const dialogRef = this._dialog.open(ViewPosterComponent, {
        data: {
          type: this._verificarBS64.transform(row.poster.fileContents),
          accion: 'view-poster',
          posterFile: row.poster.fileContents,
          comment: row.posterComments,
          poster: row,
        },
        disableClose: true,
      });
    } else {
      const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
        data: {
          type: this._verificarBS64.transform(row.poster.fileContents),
          accion: 'view-poster',
          posterFile: row.poster.fileContents,
          comment: row.posterComments,
          poster: row,
        },
        width: '1000px',
        disableClose: true,
      });
    }

  }

}
